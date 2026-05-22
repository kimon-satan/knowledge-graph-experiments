import OpenAI from "openai";
import { NODE_LABELS, type NodeLabel } from "./labels";

const client = new OpenAI();

export type Entity = {
  id: string;
  label: NodeLabel;
  name: string;
  description: string;
};

export type Relationship = {
  fromId: string;
  toId: string;
  type: string;
};

export type ExtractionResult = {
  entities: Entity[];
  relationships: Relationship[];
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function normaliseId(label: string, name: string): string {
  return `${label.toLowerCase()}_${slugify(name)}`;
}

const SYSTEM_PROMPT = `You are a knowledge graph extractor. Extract entities and relationships from the text.

Allowed entity labels: ${NODE_LABELS.join(", ")}

Rules:
- Each entity id must be: <label_lowercase>_<name_as_snake_case>  e.g. "Alan Turing" → "person_alan_turing"
- Only use the allowed labels listed above
- Relationship types must be UPPER_SNAKE_CASE  e.g. INFLUENCED, PART_OF, CREATED_BY
- Only extract entities and relationships clearly supported by the text
- If an entity is mentioned multiple times, include it once`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    entities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string", enum: [...NODE_LABELS] },
          name: { type: "string" },
          description: { type: "string" },
        },
        required: ["id", "label", "name", "description"],
        additionalProperties: false,
      },
    },
    relationships: {
      type: "array",
      items: {
        type: "object",
        properties: {
          from_id: { type: "string" },
          to_id: { type: "string" },
          type: { type: "string" },
        },
        required: ["from_id", "to_id", "type"],
        additionalProperties: false,
      },
    },
  },
  required: ["entities", "relationships"],
  additionalProperties: false,
} as const;

export async function extractGraph(text: string): Promise<ExtractionResult> {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    response_format: {
      type: "json_schema",
      json_schema: { name: "knowledge_graph", strict: true, schema: RESPONSE_SCHEMA },
    },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
  });

  const raw = JSON.parse(response.choices[0].message.content!) as {
    entities: Array<{ id: string; label: string; name: string; description: string }>;
    relationships: Array<{ from_id: string; to_id: string; type: string }>;
  };

  // Re-derive IDs from label+name so they're deterministic regardless of what the model returned.
  // Known weakness: if the same entity appears under different names across separate calls
  // (e.g. "Turing" vs "Alan Turing"), they will get different IDs and become separate nodes.
  const idMap = new Map<string, string>();
  const entities: Entity[] = raw.entities.map((e) => {
    const id = normaliseId(e.label, e.name);
    idMap.set(e.id, id);
    return { id, label: e.label as NodeLabel, name: e.name, description: e.description };
  });

  const relationships: Relationship[] = raw.relationships.map((r) => ({
    fromId: idMap.get(r.from_id) ?? r.from_id,
    toId: idMap.get(r.to_id) ?? r.to_id,
    type: r.type,
  }));

  return { entities, relationships };
}
