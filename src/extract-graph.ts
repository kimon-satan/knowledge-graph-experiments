import OpenAI from "openai";
import { EXTRACTABLE_LABELS, EXTRACTABLE_REL_TYPES, type NodeLabel, type RelType } from "./labels";

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
  type: RelType;
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

const SYSTEM_PROMPT = `You are a knowledge graph extractor for educational content. Extract a DENSE graph — a typical paragraph should yield 8–15 entities and 10–20 relationships.

Allowed entity labels: ${EXTRACTABLE_LABELS.join(", ")}
Allowed relationship types: ${EXTRACTABLE_REL_TYPES.join(", ")}

ID format: <label_lowercase>_<name_as_snake_case>  e.g. "Open-ended interview" → concept_open_ended_interview

== WHAT TO EXTRACT ==

Extract EVERY concept that is named or clearly implied. Be thorough with:
- Technical terms and methods (e.g. "probing", "open question")
- Roles and participants (e.g. "interviewer", "interviewee")
- Properties and qualities used to describe things (e.g. "exploratory", "depth")
- Implied contrasts: if the text says "unstructured", also extract "structured interview" as an implied concept

== EXAMPLE ==

Text: "Semi-structured interviews use a topic guide rather than a fixed script, giving the researcher flexibility to probe unexpected responses."

Entities (8): semi-structured interview, topic guide, fixed script, researcher, flexibility, probing, unexpected response, structured interview [implied contrast]
Relationships (9):
- semi-structured interview USES topic guide  →  PART_OF
- semi-structured interview RELATED_TO structured interview
- semi-structured interview RELATED_TO fixed script
- semi-structured interview WITHOUT_PROPERTY fixed script
- semi-structured interview HAS_PROPERTY flexibility
- semi-structured interview ENABLES probing
- probing FACILITATES unexpected response
- researcher PARTICIPATED_IN semi-structured interview
- topic guide SIMILAR_TO fixed script

== RELATIONSHIP RULES ==
- Extract ALL relationships — every meaningful connection between entities you found
- A single sentence typically yields 3–5 relationships
- Use TYPE_OF, PART_OF, HAS_PROPERTY, WITHOUT_PROPERTY, SIMILAR_TO, RELATED_TO liberally
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
          label: { type: "string", enum: [...EXTRACTABLE_LABELS] },
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
          type: { type: "string", enum: [...EXTRACTABLE_REL_TYPES] },
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
    temperature: 0.3,
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
    type: r.type as RelType,
  }));

  return { entities, relationships };
}
