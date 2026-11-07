export interface Project {
	name: string;
	question: string;
	summary: string;
	result: string;
	language: string;
	repo: string;
	demo?: { label: string; url: string };
}

export const projects: Project[] = [
	{
		name: 'rcm-ai',
		question:
			'Can a small terminology and coverage-policy graph decide Medicare medical-necessity denials better than an LLM reading the same policy?',
		summary:
			'A medical-necessity denial is a claim the payer rejected because it judged the service not medically necessary. In rcm-ai, a knowledge graph built from public ICD-10-CM and Medicare coverage files makes the decision. A language model reads the clinical note for evidence and drafts the appeal. A deterministic checker fails any appeal that cites a code or policy the graph did not establish.',
		result:
			'The premise was falsified on accuracy. On 20 synthetic cases, the LLM-only baseline scored 19/20 and the graph scored 16–17/20 on evidence the model extracted. The graph never upheld a denial that should have been appealed, sent every miss to a human, and named a source row for every step of its reasoning. The case labels still need human review.',
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
			'Researchers at academic medical centers often wait 2–4 weeks for a data request, and most of that wait is coordination, not technical work. ResearchFlow is a LangGraph workflow of six agents over a FHIR server loaded with synthetic Synthea patients. FHIR is the HL7 standard for exchanging health records. Four human review gates hold the technical decisions, such as the SQL and the phenotype definitions.',
		result:
			'A projected 73% cut in LLM cost measured 0%. I traced the gap to three bugs. One was in langchain-anthropic, which silently dropped the prompt-caching setting from plain-string system messages.',
		language: 'Python',
		repo: 'https://github.com/jagnyesh/researchflow',
		demo: { label: 'Architecture', url: 'https://jagnyesh.github.io/researchflow/architecture.html' },
	},
	{
		name: 'field-guide',
		question: 'What did the coding agent do while you were not watching?',
		summary:
			"A Claude Code plugin for developers new to agent-assisted coding. It shows what is in the agent's context, each step of the tool loop, whether the tests passed after the last edit, and what a context compaction kept. It only watches. It never blocks or rewrites a tool call, never calls a model, and never shows its findings to the model.",
		result:
			'It flags an edit that no test or check ran after, a test run that ended with new failures, and a test that was changed until it passed.',
		language: 'TypeScript',
		repo: 'https://github.com/jagnyesh/field-guide',
	},
	{
		name: 'merge-works',
		question: 'What does merging a pull request mean when several AI agents work in parallel?',
		summary:
			"An interactive drawing of a machine whose parts are the steps of the workflow: branches, CI, review, rebase, and merge. Add parallel lanes and watch the review queue grow faster than one reviewer can clear it. Each stage maps to Anthropic's AI-Native SDLC Playbook, with a safety lens for regulated engineering.",
		result: 'It runs in the browser as one self-contained file, with no build step and no network calls.',
		language: 'HTML',
		repo: 'https://github.com/jagnyesh/merge-works',
		demo: { label: 'Live', url: 'https://jagnyesh.github.io/merge-works/' },
	},
];
