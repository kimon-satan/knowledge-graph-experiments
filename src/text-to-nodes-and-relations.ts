import OpenAI from "openai";
import { EXTRACTABLE_LABELS, type NodeLabel } from "./node-labels.js";
import { EXTRACTABLE_REL_TYPES, type RelType } from "./rel-labels.js";
import { buildLabelPromptSection } from "./node-label-schema.js";

const client = new OpenAI();

export type Entity = {
  id: string;
  label: NodeLabel;
  name: string;
  description: string;
  sourceText: string[];
};

export type Relationship = {
  fromId: string;
  toId: string;
  type: RelType;
  elaboration: string;
};

export type ExtractionResult = {
  entities: Entity[];
  relationships: Relationship[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function normaliseId(label: string, name: string): string {
  return `${label.toLowerCase()}_${slugify(name)}`;
}

const SYSTEM_PROMPT = `You are a knowledge graph extractor for educational content. Extract a DENSE graph — a typical paragraph should yield 8–15 entities and 10–20 relationships.

${buildLabelPromptSection()}

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
(For each entity, source_text is the verbatim sentence above it was drawn from, e.g. structured interview → ["Semi-structured interviews use a topic guide rather than a fixed script, giving the researcher flexibility to probe unexpected responses."])
Relationships (9) — each with an elaboration explaining the connection:
- topic guide PART_OF semi-structured interview  →  "The topic guide is the backbone of the interview, listing themes to cover while leaving room to deviate."
- semi-structured interview WITHOUT_PROPERTY fixed script  →  "Unlike a structured interview, it deliberately avoids a rigid script so questions can adapt to each respondent."
- semi-structured interview HAS_PROPERTY flexibility  →  "Because the order and wording of questions aren't fixed, the researcher can follow interesting tangents as they arise."
- semi-structured interview FACILITATES probing  →  "The loose format leaves space for follow-up questions, e.g. asking 'why do you think that?' after an unexpected answer."
- probing FACILITATES unexpected response  →  "Probing surfaces detail the researcher hadn't anticipated, such as a motivation the original question didn't ask about."
- topic guide SIMILAR_TO fixed script  →  "Both steer the conversation, but a topic guide lists themes whereas a fixed script dictates exact wording."

== RELATIONSHIP RULES ==
- Extract ALL relationships — every meaningful connection between entities you found
- A single sentence typically yields 3–5 relationships
- Use TYPE_OF, PART_OF, HAS_PROPERTY, WITHOUT_PROPERTY, SIMILAR_TO liberally
- If an entity is mentioned multiple times, include it once

== ELABORATION RULES ==
For every relationship, write a one- or two-sentence "elaboration" explaining WHY the relationship holds. Choose the style that best aids understanding:
- Causal explanation when there is a mechanism — e.g. (linked list) HAS_PROPERTY (slow access): "Memory is non-contiguous, so you must traverse the list from the start until the item is found."
- Concrete everyday example when it clarifies an abstract link — e.g. (graph) COMPOSED_OF (nodes): "A train network is a graph where the nodes are stations and the edges are the lines between them."
- Brief context for simple factual links — e.g. (Dijkstra's algorithm) CREATED_BY (Edsger Dijkstra): "Conceived by Dijkstra in 1956 as a way to find shortest paths in a graph."
Keep each elaboration self-contained and understandable on its own. Do not include personal data about real, living individuals beyond what the source text states.

== SOURCE TEXT RULES ==
- For every entity, populate source_text with the verbatim sentence(s) from the input that name or imply it
- Copy the sentence(s) EXACTLY as written — do not paraphrase, trim, or reword
- For an implied contrast (e.g. "structured interview" implied by "unstructured"), cite the sentence that implied it
- If multiple sentences mention the entity, include each of them`;

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
          source_text: { type: "array", items: { type: "string" } },
        },
        required: ["id", "label", "name", "description", "source_text"],
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
          elaboration: { type: "string" },
        },
        required: ["from_id", "to_id", "type", "elaboration"],
        additionalProperties: false,
      },
    },
  },
  required: ["entities", "relationships"],
  additionalProperties: false,
} as const;

export async function textToNodesAndRelations(
  text: string,
): Promise<ExtractionResult> {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.3,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "knowledge_graph",
        strict: true,
        schema: RESPONSE_SCHEMA,
      },
    },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
  });

  const raw = JSON.parse(response.choices[0].message.content!) as {
    entities: Array<{
      id: string;
      label: string;
      name: string;
      description: string;
      source_text: string[];
    }>;
    relationships: Array<{
      from_id: string;
      to_id: string;
      type: string;
      elaboration: string;
    }>;
  };

  // Re-derive IDs from label+name so they're deterministic regardless of what the model returned.
  // Known weakness: if the same entity appears under different names across separate calls
  // (e.g. "Turing" vs "Alan Turing"), they will get different IDs and become separate nodes.
  const idMap = new Map<string, string>();
  const entities: Entity[] = raw.entities.map((e) => {
    const id = normaliseId(e.label, e.name);
    idMap.set(e.id, id);
    return {
      id,
      label: e.label as NodeLabel,
      name: e.name,
      description: e.description,
      sourceText: e.source_text,
    };
  });

  const relationships: Relationship[] = raw.relationships.map((r) => ({
    fromId: idMap.get(r.from_id) ?? r.from_id,
    toId: idMap.get(r.to_id) ?? r.to_id,
    type: r.type as RelType,
    elaboration: r.elaboration,
  }));

  return { entities, relationships };
}
