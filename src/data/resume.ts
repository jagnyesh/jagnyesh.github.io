// Transcribed from the résumé document. Keep the two in sync; the phone number is left out on purpose.

export interface Role {
	title: string;
	org: string;
	unit?: string;
	location?: string;
	dates: string;
	bullets: string[];
}

export const headline = [
	'Clinical Informatics',
	'Clinical Data Governance & Standards',
	'Canonical Data Models & Data Quality',
];

export const location = 'Chicago, IL';

export const summary =
	'Clinical informatics and product professional with 9+ years across providers, payers, PBMs, and federal and public health, defining and governing the canonical data models, terminology mappings, and data standards where clinical documentation and payer data meet operational systems. Established HL7 v2-to-FHIR mapping standards adopted across 8 Optum business units and built a unified OMOP data layer harmonizing multiple EHR systems. Works fluently in Epic data (Clarity, Caboodle, Cogito), FHIR and HL7 v2/v3, USCDI, and OMOP vocabularies. Specializes in validating AI and NLP outputs against clinical data standards before they reach operational workflows.';

export const experience: Role[] = [
	{
		title: 'Software Product Development Analyst III',
		org: 'Tufts Medicine',
		unit: 'Tufts Clinical and Translational Science Institute',
		location: 'Boston, MA',
		dates: 'September 2026 – Present',
		bullets: [
			"Lead the team's evaluation of AI tools for development and data discovery across Epic (Cogito Assistant, Agent Factory), Databricks (Genie), and GitHub (Copilot); briefed leadership on strengths and limits, including PHI governance and reproducibility, and proposed a scoped Genie pilot.",
			'Designed and built a self-paced FunSQL/Julia trainer that takes SQL-only analysts through OMOP concept lookup, source-to-standard vocabulary mapping, hierarchy traversal, and cohort building; runs fully offline on a bundled synthetic OMOP database.',
		],
	},
	{
		title: 'Biomedical Informatics Research Specialist',
		org: 'University of Illinois Chicago',
		unit: 'Center for Clinical and Translational Sciences',
		location: 'Chicago, IL',
		dates: 'August 2023 – December 2025',
		bullets: [
			'Designed a unified, canonical data layer on the OMOP Common Data Model that harmonizes data across multiple EHR systems into a single standard representation, improving research data quality by 30%.',
			'Led development of a near real-time clinical data pipeline from Epic, improving data freshness and cutting research data access from 2 weeks to hours for 50+ active studies.',
			'Interviewed PIs to locate the bottleneck in trial enrollment, defined requirements, and led a prototype for automated monthly eligibility screening that cut enrollment time by 50%.',
			'Evaluated and piloted LLM tools for cohort identification and protocol feasibility, informing institutional AI adoption strategy.',
		],
	},
	{
		title: 'Senior Business Data Analyst',
		org: 'Optum/UnitedHealth Group',
		unit: 'Enterprise Clinical Data Hub',
		location: 'Minneapolis, MN',
		dates: 'January 2022 – August 2023',
		bullets: [
			'Led business analysis for the cloud migration of an enterprise clinical data platform processing 1B+ daily transactions for 100M+ members; translated clinical data transformation requirements into specifications that reduced data latency by 99%, improving data freshness and HEDIS reporting timeliness.',
			"Redesigned the team's QA methodology to catch 75% more defects before production, reducing rework costs by 40%; owned backlog prioritization, sprint planning, and user stories for a cross-functional team.",
			'Managed external technology vendors and held them to interoperability standards, reducing integration errors by 25% across partner implementations.',
		],
	},
	{
		title: 'Senior Systems Engineer',
		org: 'CDC',
		unit: 'Center for Surveillance, Epidemiology and Laboratory Services',
		location: 'Atlanta, GA',
		dates: 'January 2022 – September 2022',
		bullets: [
			'Shaped federal and state clinical data interoperability strategy during COVID-19, enabling real-time public health surveillance that informed national response decisions.',
			'Established evaluation frameworks that compressed health data standards assessment from months to days; trained 50+ epidemiologists and data scientists in FHIR-based clinical data exchange.',
			'Authored implementation guides that set the standard where federal requirements had gaps, cutting developer onboarding time by 25% and accelerating state-level adoption.',
			'Contributed to 10+ new USCDI data element proposals, helping define national core data elements and influencing the national interoperability roadmap.',
		],
	},
	{
		title: 'Senior Systems Analysis Consultant',
		org: 'Optum/UnitedHealth Group',
		unit: 'Optum Incubator, Product Engineering',
		location: 'Minneapolis, MN',
		dates: 'April 2021 – December 2021',
		bullets: [
			'Increased annual revenue capture by $2M through an ML-based HCC risk adjustment model applying NLP to unstructured clinical notes, improving coding accuracy by 7%.',
			'Designed real-time clinical data orchestration between clinics and labs, reducing prior authorization turnaround from 2 days to hours.',
			'Led a cross-functional team that took 2 MVPs from concept to launch; one reached 500+ provider adoptions within 3 months.',
			'Automated clinical data workflows, reducing manual data entry by 33% and improving provider response times.',
		],
	},
	{
		title: 'Senior Business Analyst, Product Management',
		org: 'Optum/UnitedHealth Group',
		unit: 'Single Data Repository',
		location: 'Minneapolis, MN',
		dates: 'October 2020 – April 2021',
		bullets: [
			'Defined the HL7 v2-to-FHIR transformation strategy for 500M+ messages per month; established canonical enterprise mapping standards adopted across 8 business units.',
			'Led development of Patient Access APIs that achieved ONC certification for USCDI v1, among the first in the US, giving 50M+ members real-time access to their health data.',
			'Applied statistical analysis to detect data quality patterns, improving parsing accuracy by 10% and preventing an estimated $5M in compliance penalties.',
		],
	},
	{
		title: 'Data Analyst, Clinical Analytics and Reporting',
		org: 'OptumRx/UnitedHealth Group',
		location: 'Schaumburg, IL',
		dates: 'November 2019 – July 2020',
		bullets: [
			'Analyzed 80M+ pharmacy claims records to support client grandfathering; improved SAS/Netezza automation, reducing processing time by 25%.',
			'Enhanced data pipelines and ETL processes supporting $30M+ in revenue.',
			'Built a cloud-native proof of concept for real-time pharmacy data exchange that laid the groundwork for enterprise cloud migration.',
		],
	},
	{
		title: 'Product Management & Business Analyst Roles',
		org: 'Reliance Jio, Aditya Birla Finance',
		location: 'Mumbai, India',
		dates: '2014 – 2017',
		bullets: [
			'Built credit risk ML models (+4% prediction accuracy on a $10M+ loan portfolio), led a digital lending product for 100K+ SMEs that cut customer acquisition costs by 14%, and mentored a team of 10 analysts.',
		],
	},
];

export const skills: { label: string; items: string }[] = [
	{
		label: 'Clinical data governance',
		items:
			'Canonical data models (OMOP CDM, FHIR R4), enterprise mapping standards, data quality and freshness validation, implementation guides, USCDI standards development, ONC certification',
	},
	{
		label: 'Clinical terminology & coding',
		items:
			'Clinical terminology mapping (ICD-10-CM, SNOMED CT, LOINC, RxNorm via OMOP standard vocabularies), HCC risk adjustment, NLP on unstructured clinical notes',
	},
	{
		label: 'EHR & interoperability',
		items:
			'Epic (Clarity, Caboodle, Cogito), Cerner, Allscripts; FHIR R4, HL7 v2/v3, C-CDA, USCDI; Mirth Connect, InterSystems Iris',
	},
	{
		label: 'Revenue cycle & payer data',
		items: 'Prior authorization workflows, pharmacy claims analysis, HEDIS quality reporting, CMS Patient Access APIs',
	},
	{
		label: 'Data & analytics',
		items:
			'SQL, Python, SAS, Julia (FunSQL), OMOP CDM, Databricks, Snowflake, Azure, AWS, Tableau, statistical analysis',
	},
	{
		label: 'Clinical AI evaluation',
		items:
			'LLM evaluation for clinical workflows, PHI governance, reproducibility, agentic AI development, Claude Code',
	},
	{
		label: 'Delivery',
		items:
			'Clinician and PI requirements interviews, backlog prioritization, vendor management, MVP launch, Agile/Scrum',
	},
];

export const education = [
	{ degree: 'Master of Science, Industrial Engineering', school: 'University of South Florida, Tampa, FL' },
	{
		degree: 'Bachelor of Engineering, Electronics & Telecommunications',
		school: 'Mumbai University, India',
	},
];

export const certifications = [
	'Epic: Cogito, Clarity, Caboodle, and Clinical Data Model',
	'Lean Six Sigma Green Belt (IISE)',
];
