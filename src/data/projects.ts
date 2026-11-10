export interface Project {
	name: string;
	question: string;
	summary: string;
	result: string;
	// One line of the result for the small home cards. The lead card shows the whole result.
	finding?: string;
	language: string;
	repo: string;
	demo?: { label: string; url: string };
}

export const projects: Project[] = [
	{
		name: 'rcm-ai',
		question:
			'Can a small graph of codes and coverage policy triage Medicare medical-necessity denials better than an LLM reading the same policy?',
		summary:
			'A medical-necessity denial is a claim the payer rejected because it judged the service not medically necessary. In rcm-ai, a knowledge graph built from public ICD-10-CM and Medicare coverage files makes the decision. A language model reads the clinical note for evidence and drafts the appeal. A deterministic checker fails any appeal that cites a code or policy the graph did not establish.',
		result:
			'Not on accuracy. On 20 synthetic cases, the LLM-only baseline scored 19/20. The graph scored 16/20 on evidence the model extracted, and 17/20 in a later run. It never upheld a denial that should have been appealed, and it sent every miss to a human. Every step behind an appealable verdict names a source row. The case labels still need human review.',
		language: 'Python',
		repo: 'https://github.com/jagnyesh/rcm-ai',
		demo: {
			label: 'Architecture explorer',
			url: 'https://jagnyesh.github.io/rcm-ai/architecture/rcm-ai-explorer.html',
		},
	},
	{
		name: 'researchflow',
		question:
			'Can AI agents take over the coordination work in clinical research data requests and leave the technical decisions to the people who should make them?',
		summary:
			'Where I supported clinical research for two years, a data request took 2–4 weeks. Most of that wait was coordination, not technical work. ResearchFlow is a LangGraph workflow of AI agents over a FHIR server loaded with patients from Synthea, an open-source generator of synthetic patient records. FHIR is the current HL7 standard for exchanging health records. People make the technical decisions, such as the SQL and the phenotype definitions, at four review gates. A phenotype definition is the set of rules that decides which patients count as having a condition.',
		result:
			'On proof-of-concept runs against synthetic data, a request took 4–8 hours, and no SQL query ran until an informatician approved it. I have not measured turnaround on real requests. I projected a 73% cut in LLM cost, and the measured cut was 0%. I traced the gap to three bugs. One was in langchain-anthropic, which dropped the prompt-caching setting from plain-string system messages and raised no error.',
		finding: 'I projected a 73% cut in LLM cost, and the measured cut was 0%. I traced the gap to three bugs.',
		language: 'Python',
		repo: 'https://github.com/jagnyesh/researchflow',
		demo: { label: 'Architecture', url: 'https://jagnyesh.github.io/researchflow/architecture.html' },
	},
	{
		name: 'field-guide',
		question: 'What did the coding agent do while you were not watching?',
		summary:
			"field-guide is a Claude Code plugin for developers new to agent-assisted coding. It shows what is in the agent's context and each step of the tool loop. It also shows whether the tests passed after the last edit and what a compaction kept. A compaction is the summary Claude Code writes in place of earlier messages when the conversation fills the context window. The plugin only watches. It never blocks or rewrites a tool call, never calls a model, and never shows its findings to the model.",
		result:
			'It flags an edit that no test or check ran after. It also flags a test run that ended with new failures, and a test the agent edited until it passed.',
		finding: 'It flags an edit that no test or check ran after, and a test the agent edited until it passed.',
		language: 'TypeScript',
		repo: 'https://github.com/jagnyesh/field-guide',
	},
	{
		name: 'merge-works',
		question: 'What does merging a pull request mean when several AI agents work in parallel?',
		summary:
			"merge-works is an interactive drawing of a machine. Each part is one step of the workflow: branches, CI, review, rebase, and merge. Add parallel lanes and watch the review queue grow faster than one reviewer can clear it. Each step maps to a stage of Anthropic's AI-Native SDLC Playbook. The README adds safety rules for regulated engineering. For example, a person, not an agent, merges any change that touches PHI. The drawing runs in the browser as one self-contained file, with no build step and no network calls.",
		result:
			'In the simulation, at four or five lanes, the time a change takes to pass CI stays flat. The time from passing CI to merge climbs, because changes wait for the one reviewer. That reviewer sets the limit on parallel work.',
		finding:
			'In the simulation, at four or five lanes, changes wait for the one reviewer. That reviewer sets the limit on parallel work.',
		language: 'HTML',
		repo: 'https://github.com/jagnyesh/merge-works',
		demo: { label: 'Live', url: 'https://jagnyesh.github.io/merge-works/' },
	},
];
