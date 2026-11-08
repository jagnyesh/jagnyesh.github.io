// Transcribed from the résumé document. Keep the two in sync; the phone number is left out on purpose.

export interface Role {
	title: string;
	org: string;
	unit?: string;
	location?: string;
	dates: string;
	bullets: string[];
}

export const location = 'Chicago, IL';

export const summary =
	'Clinical informatics and product professional with 9+ years at providers, payers, PBMs, and federal and public health agencies. Defines and governs the data models, terminology mappings, and data standards that connect clinical documentation and payer data to operational systems. Established HL7 v2-to-FHIR mapping standards adopted across 8 Optum business units and built an OMOP data layer that unified data from multiple EHR systems. Works in Epic data (Clarity, Caboodle, Cogito), FHIR and HL7 v2/v3, USCDI, and OMOP vocabularies. Specializes in validating AI and NLP output against clinical data standards before it reaches operational workflows.';

export const experience: Role[] = [
	{
		title: 'Software Product Development Analyst III',
		org: 'Tufts Medicine',
		unit: 'Tufts Clinical and Translational Science Institute',
		location: 'Boston, MA',
		dates: 'September 2026 – Present',
		bullets: [
			"Lead the team's evaluation of AI tools for development and data discovery across Epic (Cogito Assistant, Agent Factory), Databricks (Genie), and GitHub (Copilot). Briefed leadership on strengths and limits, including PHI governance and reproducibility, and proposed a scoped Genie pilot.",
			'Designed and built a self-paced FunSQL/Julia trainer that takes SQL-only analysts through OMOP concept lookup, source-to-standard vocabulary mapping, hierarchy traversal, and cohort building. It runs offline on a bundled synthetic OMOP database.',
		],
	},
	{
		title: 'Biomedical Informatics Research Specialist',
		org: 'University of Illinois Chicago',
		unit: 'Center for Clinical and Translational Sciences',
		location: 'Chicago, IL',
		dates: 'August 2023 – December 2025',
		bullets: [
			'Designed a data layer on the OMOP Common Data Model that unifies data from multiple EHR systems into one standard representation, improving research data quality by 30%.',
			'Led development of a near real-time clinical data pipeline from Epic that cut research data access from 2 weeks to hours for 50+ active studies.',
			'Interviewed PIs to locate the bottleneck in trial enrollment, defined requirements, and led a prototype for automated monthly eligibility screening that cut enrollment time by 50%.',
			'Evaluated and piloted LLM tools for cohort identification and protocol feasibility.',
		],
	},
	{
		title: 'Senior Business Data Analyst',
		org: 'Optum/UnitedHealth Group',
		unit: 'Enterprise Clinical Data Hub',
		location: 'Minneapolis, MN',
		dates: 'January 2022 – August 2023',
		bullets: [
			'Led business analysis for the cloud migration of an enterprise clinical data platform that processes 1B+ daily transactions for 100M+ members. Translated clinical data transformation requirements into specifications that reduced data latency by 99%.',
			"Redesigned the team's QA process to catch 75% more defects before production, reducing rework costs by 40%. Owned backlog prioritization, sprint planning, and user stories for a cross-functional team.",
			'Managed external technology vendors and held them to interoperability standards, reducing integration errors by 25% across partner implementations.',
		],
	},
	{
		title: 'Senior Systems Analysis Consultant',
		org: 'Optum/UnitedHealth Group',
		unit: 'Optum Incubator, Product Engineering',
		location: 'Minneapolis, MN',
		dates: 'April 2021 – December 2021',
		bullets: [
			'Increased annual revenue capture by $2M through an ML-based HCC risk adjustment model that applied NLP to unstructured clinical notes and improved coding accuracy by 7%.',
			'Designed real-time clinical data orchestration between clinics and labs, reducing prior authorization turnaround from 2 days to hours.',
			'Led a cross-functional team that took 2 MVPs from concept to launch. One reached 500+ provider adoptions within 3 months.',
			'Automated clinical data workflows, reducing manual data entry by 33%.',
		],
	},
	{
		title: 'Senior Business Analyst, Product Management',
		org: 'Optum/UnitedHealth Group',
		unit: 'Single Data Repository',
		location: 'Minneapolis, MN',
		dates: 'October 2020 – April 2021',
		bullets: [
			'Defined the HL7 v2-to-FHIR transformation strategy for 500M+ messages per month. Established enterprise mapping standards adopted across 8 business units.',
			'Led development of Patient Access APIs that achieved ONC certification for USCDI v1, among the first in the US, giving 50M+ members real-time access to their health data.',
			'Applied statistical analysis to detect data quality patterns, improving parsing accuracy by 10% and preventing an estimated $5M in compliance penalties.',
		],
	},
	{
		title: 'Senior Systems Engineer',
		org: 'CDC',
		unit: 'Center for Surveillance, Epidemiology and Laboratory Services',
		location: 'Atlanta, GA',
		dates: 'January 2022 – September 2022',
		bullets: [
			'Shaped federal and state clinical data interoperability strategy for real-time public health surveillance during COVID-19.',
			'Established evaluation frameworks that cut health data standards assessment from months to days. Trained 50+ epidemiologists and data scientists in FHIR-based clinical data exchange.',
			'Authored implementation guides for areas where federal requirements had gaps, cutting developer onboarding time by 25%.',
			'Contributed to 10+ new USCDI data element proposals.',
		],
	},
	{
		title: 'Data Analyst',
		org: 'OptumRx/UnitedHealth Group',
		unit: 'Clinical Analytics and Reporting',
		location: 'Schaumburg, IL',
		dates: 'November 2019 – July 2020',
		bullets: [
			'Analyzed 80M+ pharmacy claims records to support client grandfathering. Improved SAS/Netezza automation, reducing processing time by 25%.',
			'Improved data pipelines and ETL processes that support $30M+ in revenue.',
			'Built a cloud-native proof of concept for real-time pharmacy data exchange.',
		],
	},
	{
		title: 'Product management and business analyst roles',
		org: 'Reliance Jio, Aditya Birla Finance',
		location: 'Mumbai, India',
		dates: '2014 – 2017',
		bullets: [
			'Built credit risk ML models (+4% prediction accuracy on a $10M+ loan portfolio). Led a digital lending product for 100K+ SMEs that cut customer acquisition costs by 14%, and mentored a team of 10 analysts.',
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
			'Terminology mapping (ICD-10-CM, SNOMED CT, LOINC, RxNorm via OMOP standard vocabularies), HCC risk adjustment, NLP on unstructured clinical notes',
	},
	{
		label: 'EHR & interoperability',
		items:
			'Epic (Clarity, Caboodle, Cogito), Cerner, Allscripts; FHIR R4, HL7 v2/v3, C-CDA; Mirth Connect, InterSystems Iris',
	},
	{
		label: 'Revenue cycle & payer data',
		items: 'Prior authorization workflows, pharmacy claims analysis, HEDIS quality reporting, CMS Patient Access APIs',
	},
	{
		label: 'Data & analytics',
		items: 'SQL, Python, SAS, Julia (FunSQL), Databricks, Snowflake, Azure, AWS, Tableau, statistical analysis',
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
