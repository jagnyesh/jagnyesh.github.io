// Builds src/data/life.json, the data behind the home page's life figure, from one Synthea FHIR R4 bundle.
// Synthea writes synthetic patients, so the figure shows no real person's data.
//
// The bundle is not committed (about 21 MB). To regenerate it with Synthea's master-branch-latest jar and Java 17:
//   java -jar synthea-with-dependencies.jar -s 2026 -cs 2026 -r 20261101 -p 4 -a 55-70 \
//     --exporter.years_of_history=0 --exporter.fhir.export=true --exporter.csv.export=false \
//     --exporter.hospital.fhir.export=false --exporter.practitioner.fhir.export=false Massachusetts
// years_of_history=0 keeps the whole life. Synthea's default exports only the last 10 years.
// The figure uses the patient born 1967-05-17. Then run:
//   node scripts/life-data.mjs <path to that patient's bundle>
import { readFileSync, writeFileSync } from 'node:fs';

const AS_OF = '2026-11-01';
const WIDTH = 56;

// Each milestone names the resource by type and code. Where a code repeats, as vital signs do, the date picks one.
// A condition's site is where the figure marks it on the body: the condition's finding site in SNOMED CT. Anemia and
// type 2 diabetes affect the whole body, so they get no mark.
const MILESTONES = [
	{ type: 'Patient', label: 'Born' },
	{ type: 'Observation', code: '29463-7', date: '1967-05-17', label: 'Body weight' },
	{ type: 'Immunization', code: '10', label: 'Polio vaccine' },
	{ type: 'Condition', code: '74400008', label: 'Appendicitis', site: 'appendix' },
	{ type: 'Condition', code: '62106007', label: 'Concussion', site: 'brain' },
	{ type: 'Observation', code: '8302-2', date: '1985-07-10', label: 'Body height' },
	{ type: 'Condition', code: '271737000', label: 'Anemia' },
	{ type: 'Observation', code: '39156-5', date: '2004-08-04', label: 'BMI' },
	{ type: 'Observation', code: '4548-4', date: '2016-06-22', label: 'HbA1c' },
	{ type: 'Condition', code: '44054006', label: 'Type 2 diabetes' },
	{ type: 'Condition', code: '431855005', label: 'Chronic kidney disease, stage 1', site: 'kidneys' },
	{ type: 'MedicationRequest', code: '860975', label: 'Metformin' },
	{ type: 'Condition', code: '414545008', label: 'Ischemic heart disease', site: 'heart' },
	{ type: 'Condition', code: '1551000119108', label: 'Diabetic retinopathy', site: 'eyes' },
];

const bundle = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const resources = bundle.entry.map((e) => e.resource);
const patient = resources.find((r) => r.resourceType === 'Patient');
const birth = Date.parse(patient.birthDate);
const day = (iso) => iso.slice(0, 10);
const ageAt = (iso) => (Date.parse(day(iso)) - birth) / (365.25 * 864e5);
const round = (x, places) => Math.round(x * 10 ** places) / 10 ** places;

const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
const DATE_PATHS = [
	'birthDate', 'period.start', 'onsetDateTime', 'recordedDate', 'effectiveDateTime', 'effectivePeriod.start',
	'performedDateTime', 'performedPeriod.start', 'billablePeriod.start', 'authoredOn', 'occurrenceDateTime',
	'started', 'date', 'recorded',
];
const dateOf = (r) => DATE_PATHS.map((p) => get(r, p)).find((v) => typeof v === 'string');
const codeOf = (r) => (r.code ?? r.medicationCodeableConcept ?? r.vaccineCode)?.coding?.[0]?.code;
const coding = (concept) => ({ coding: concept.coding.map(({ system, code, display }) => ({ system, code, display })) });
const quantity = ({ value, unit, system, code }) => ({ value: round(value, 2), unit, system, code });

// Trimmed for display: each resource keeps its type, status, code, value and date. Dates drop the time of day,
// which FHIR's dateTime type allows.
function trim(r) {
	switch (r.resourceType) {
		case 'Patient':
			return { resourceType: r.resourceType, id: r.id, gender: r.gender, birthDate: r.birthDate };
		case 'Observation':
			return {
				resourceType: r.resourceType,
				status: r.status,
				code: coding(r.code),
				effectiveDateTime: day(r.effectiveDateTime),
				valueQuantity: quantity(r.valueQuantity),
			};
		case 'Condition':
			return {
				resourceType: r.resourceType,
				clinicalStatus: { coding: r.clinicalStatus.coding.map(({ system, code }) => ({ system, code })) },
				code: coding(r.code),
				onsetDateTime: day(r.onsetDateTime),
			};
		case 'Immunization':
			return {
				resourceType: r.resourceType,
				status: r.status,
				vaccineCode: coding(r.vaccineCode),
				occurrenceDateTime: day(r.occurrenceDateTime),
			};
		case 'MedicationRequest':
			return {
				resourceType: r.resourceType,
				status: r.status,
				intent: r.intent,
				medicationCodeableConcept: coding(r.medicationCodeableConcept),
				authoredOn: day(r.authoredOn),
			};
	}
	throw new Error(`No trim rule for ${r.resourceType}`);
}

// Prints JSON the way a person would: a value stays on one line when it fits within WIDTH.
function inline(v) {
	if (Array.isArray(v)) return `[${v.map(inline).join(', ')}]`;
	if (v && typeof v === 'object') return `{ ${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${inline(x)}`).join(', ')} }`;
	return JSON.stringify(v);
}
function pretty(v, indent = '', lead = 0) {
	const one = inline(v);
	if (v === null || typeof v !== 'object' || lead + one.length <= WIDTH) return one;
	const next = `${indent}  `;
	if (Array.isArray(v)) {
		if (v.length === 1 && v[0] && typeof v[0] === 'object') return `[${pretty(v[0], indent, lead + 1)}]`;
		return `[\n${v.map((x) => next + pretty(x, next, next.length)).join(',\n')}\n${indent}]`;
	}
	const lines = Object.entries(v).map(([k, x]) => {
		const key = `${next}${JSON.stringify(k)}: `;
		return key + pretty(x, next, key.length);
	});
	return `{\n${lines.join(',\n')}\n${indent}}`;
}

const milestones = MILESTONES.map((m) => {
	const match = resources
		.filter((r) => r.resourceType === m.type && (!m.code || codeOf(r) === m.code))
		.filter((r) => !m.date || day(dateOf(r)) === m.date)
		.sort((a, b) => dateOf(a).localeCompare(dateOf(b)))[0];
	if (!match) throw new Error(`No resource for ${JSON.stringify(m)}`);
	const date = day(dateOf(match));
	const vq = match.valueQuantity;
	return {
		age: round(ageAt(date), 3),
		date,
		type: m.type,
		label: m.label,
		value: vq ? `${round(vq.value, 1)} ${vq.unit}` : undefined,
		site: m.site,
		resolvedAge: match.abatementDateTime ? round(ageAt(match.abatementDateTime), 3) : undefined,
		json: pretty(trim(match)),
	};
});

const observations = (code) =>
	resources
		.filter((r) => r.resourceType === 'Observation' && codeOf(r) === code)
		.sort((a, b) => a.effectiveDateTime.localeCompare(b.effectiveDateTime));
const series = (code) => observations(code).map((r) => [round(ageAt(r.effectiveDateTime), 3), round(r.valueQuantity.value, 1)]);
const component = (r, code) => r.component.find((c) => c.code.coding[0].code === code).valueQuantity.value;

// Synthea gives infants and children adult blood pressures, so the figure shows blood pressure from age 18 only.
const bp = observations('85354-9')
	.map((r) => [round(ageAt(r.effectiveDateTime), 3), component(r, '8480-6'), component(r, '8462-4')])
	.filter(([age]) => age >= 18);

// Resources recorded by the end of each month of life. Undated resources, such as Medication, count at AS_OF.
const asOfAge = ageAt(AS_OF);
const months = Math.ceil(asOfAge * 12);
const perMonth = new Array(months).fill(0);
let undated = 0;
for (const r of resources) {
	const d = dateOf(r);
	if (!d) undated++;
	const m = d ? Math.floor(ageAt(d) * 12) : months - 1;
	perMonth[Math.min(Math.max(m, 0), months - 1)]++;
}
let running = 0;
const counts = perMonth.map((n) => (running += n));

const out = {
	source: 'Synthea master-branch-latest, seed 2026, reference date 2026-11-01',
	asOf: AS_OF,
	asOfAge: round(asOfAge, 3),
	patient: { gender: patient.gender, birthDate: patient.birthDate },
	total: resources.length,
	milestones,
	series: { height: series('8302-2'), weight: series('29463-7'), bmi: series('39156-5'), bp },
	counts,
};
writeFileSync(new URL('../src/data/life.json', import.meta.url), `${JSON.stringify(out)}\n`);
console.log(
	`${milestones.length} milestones, ${resources.length} resources (${undated} undated), ` +
		`series: height ${out.series.height.length}, weight ${out.series.weight.length}, bmi ${out.series.bmi.length}, bp ${bp.length}`,
);
