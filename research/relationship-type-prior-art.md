# Prior Art: Knowledge Graph Relationship Type Vocabularies

**Question:** Is there an established relationship-type vocabulary we should adopt or adapt, rather than designing from scratch?

**Short answer:** No single standard dominates. The recommendation across sources is to design for your use case. Our categorical approach is well-founded and our vocabulary is on the larger/richer end of what educational KG work actually uses.

---

## General-purpose vocabularies

**ConceptNet 5.5** — closest match to our needs

- ~34 named relation types organised into semantic categories (Things, Agents, Events, Causal, Functional, Spatial, etc.) \* Not actually trie
- Designed for NLP extraction, not formal logic — directly applicable to LLM pipelines
- Grew organically from corpus construction, not top-down from ontological theory
- Relevant types not in our current schema: `HasPrerequisite`, `UsedFor`, `CapableOf`, `MadeOf`
- Coverage: our schema maps well onto their categories; `PREREQUISITE_OF` and `USED_FOR` are the clearest gaps

**WordNet**

- Only three relation types: synonym, is-a (hypernym), part-of
- Far too narrow for general educational extraction

**SKOS (Simple Knowledge Organization System)**

- Focused on `broader`/`narrower`/`related` — taxonomy only
- Designed for thesaurus/classification systems, not general semantic extraction

**DOLCE upper ontology**

- ~48 relations with domain/range constraints; extendable to ~72 with domain additions
- Most principled academic framework; too formal/heavyweight for our use case
- Key insight: distinguishes `immediate-relation` vs `mediated-relation` at the top level — consistent with our hard/soft constraint split

**SUMO**

- Formally defined in higher-order logic; includes a mid-level and dozens of domain ontologies
- Cross-referenced against WordNet; institutional endorsement (IEEE working group)
- Overkill for an extraction pipeline; the formal axiomatisation isn't useful here

**Wikidata**

- Decentralised, community-built; no fixed authoritative relation set
- Useful properties: `instance of` (P31), `subclass of` (P279), `part of`, `has use`
- Not suitable as a canonical vocabulary — too open-ended

**Schema.org**

- ~600 terms; centrally managed; entity-relationship approach in RDF
- General web semantics rather than domain knowledge representation
- Not designed for educational or conceptual extraction

---

## Educational knowledge graph schemas

Surveyed papers consistently design their own vocabularies without referencing formal upper ontologies.

**Graphusion** (NLP education KG, 7 types)

- `Prerequisite_of`, `Used_for`, `Compare`, `Conjunction`, `Hyponym_of`, `Evaluate_for`, `Part_of`
- Adopted from prior NLP work (Luan et al. 2018), not from any ontology
- GPT-4o achieves 2.37/3 quality score with substantial inter-annotator agreement (κ = 0.67) on relation extraction with this vocabulary

**LectureBank / TutorialBank**

- Single relation type: `prerequisite`
- 208 manually-labelled topic pairs across 1,352 university lecture files

**OBE curriculum KGs**

- 11 types: achieve, correspond, support, belong to, contain, Prerequisite courses, etc.
- Domain-specific to outcome-based education hierarchy; not transferable

**Common pattern across all educational KG papers**

- 1–7 relation types, overwhelmingly focused on prerequisite/dependency relations
- No paper in the survey adopted ConceptNet, SKOS, BFO, DOLCE, or SUMO
- Relationship types are chosen to serve navigational/traceability purposes, not general semantic coverage

---

## Practitioner guidance (LLM extraction pipelines)

- Unconstrained LLM extraction produces inconsistent, redundant types (e.g. `CO-FOUNDER` and `COFOUNDEROF` as separate types for the same relation) — constrained vocabulary is essential
- LangChain/practitioner consensus: **define your own node labels and relationship types** rather than relying on open-ended LLM generation
- Optional vocabulary injection via parameter is supported but not mandated by frameworks — the schema design is the user's responsibility
- Knowledge graphs differ from ontologies in that the ontology within a KG is typically shallow; statistical/neuro-symbolic methods handle inference rather than complex logical axioms — a lightweight relation vocabulary is sufficient

---

## Key takeaways for our design

- **Adopt ConceptNet's categories** as the organising framework (Taxonomy, Composition, Causation, Measurement, Attribution, Comparison, Agency, Prerequisite, Purpose) — we were already converging on this
- **`PREREQUISITE_OF`** is the most-studied single relation in educational KG literature; its absence from our schema is the clearest gap
- **`USED_FOR`** appears in both ConceptNet and Graphusion; distinct from `FACILITATES` (instrument vs enabler)
- Our 14-type schema (12 settled + 2 new) is already richer than anything found in educational KG literature — quality of definitions matters more than adding more types
- No need to import any vocabulary wholesale; designing for our label set is the right call
