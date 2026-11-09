// Draws the person in the home page's life figure. The server renders the final frame with it, and the browser
// redraws every frame of the animation with it, so both always agree on the shape.
// Height comes from the record's Body Height observations. Proportions follow the usual growth ratios: a newborn's
// head is about a quarter of its length, an adult's about an eighth.

export const S = 1.2; // SVG units per centimeter
export const GROUND = 268;
export const CX = 78;
export const RULER_X = 150;

type Table = [number, number][];
const HEAD: Table = [[0, 0.25], [1, 0.22], [2, 0.2], [6, 0.17], [12, 0.145], [18, 0.135]];
const LEG: Table = [[0, 0.33], [2, 0.39], [6, 0.43], [12, 0.46], [18, 0.47]];
const SHOULDER: Table = [[0, 0.3], [2, 0.27], [6, 0.23], [12, 0.22], [18, 0.23]];
const ARM: Table = [[0, 0.3], [2, 0.33], [18, 0.38]];
// How far the hair falls below the middle of the head, in head radii: short on a toddler, a bob above the shoulders
// on an adult.
const HAIR: Table = [[0, 0.4], [2, 0.6], [6, 0.95], [12, 1.15], [18, 1.25]];

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

export const yOf = (cm: number) => GROUND - cm * S;
// The ruler stops at 180 cm, the first round mark above her adult height, and the drawing's view box starts just
// above it, so no empty headroom pushes the figure down.
export const RULER_TOP = 180;
export const VIEW_TOP = 44;
export const RULER_LABELS = [50, 100, 150, RULER_TOP];
/** True when the height label at the top of the head would sit on this ruler number. */
export const covers = (cm: number, top: number) => Math.abs(yOf(cm) - top) < 9;
/** Width of the height label's box. The label is 8px IBM Plex Mono, whose characters are 0.6em wide. */
export const labelWidth = (text: string) => Math.round(text.length * 4.8 + 7);

export function table(t: number, points: Table) {
	if (t <= points[0][0]) return points[0][1];
	for (let i = 1; i < points.length; i++) {
		const [a, va] = points[i - 1];
		const [b, vb] = points[i];
		if (t <= b) return va + ((vb - va) * (t - a)) / (b - a);
	}
	return points[points.length - 1][1];
}

const n = (x: number) => Math.round(x * 10) / 10;

export interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
	rx: number;
	transform?: string;
}
export interface Ellipse {
	cx: number;
	cy: number;
	rx: number;
	ry: number;
}

/** Where a condition's mark sits: its finding site, seen from the front. The person faces the viewer, so her
 * right side is on the viewer's left. */
export type Site = 'brain' | 'eyes' | 'heart' | 'kidneys' | 'appendix';

export interface Shape {
	top: number;
	head: { cx: number; cy: number; r: number };
	neck: Rect;
	collar: Ellipse;
	torso: string;
	hairBack: string;
	hairFront: string;
	armL: Rect;
	armR: Rect;
	legL: Rect;
	legR: Rect;
	shoeL: Ellipse;
	shoeR: Ellipse;
	shadow: Ellipse;
	swaddle: Rect;
	fold: string;
	/** 1 while the newborn is swaddled, fading to 0 as the toddler stands. */
	infant: number;
	hairOpacity: number;
	/** 0 for dark hair, rising to about 0.85 as it grays from the mid-40s. */
	gray: number;
	/** 0 while the legs show, 1 once she wears trousers. */
	trousers: number;
	sites: Record<Site, [number, number][]>;
}

export function figure(age: number, cm: number, bmi: number | null): Shape {
	const H = cm * S;
	const top = GROUND - H;
	const headH = H * table(age, HEAD);
	const r = headH / 2;
	const cy = top + r;
	// Only adult BMI widens the figure. Children's BMI runs lower for their age and would make them look gaunt.
	const girth = age >= 18 && bmi ? clamp(Math.sqrt(bmi / 22), 0.9, 1.22) : 1;

	const sY = top + headH + H * 0.025;
	const hipY = GROUND - H * table(age, LEG);
	const sw = ((H * table(age, SHOULDER)) / 2) * girth;
	const waist = sw * 0.8 * girth ** 0.9;
	const hip = sw * (age >= 13 ? 0.98 : 0.9);
	const c = sw * 0.45;
	const waistY = sY + (hipY - sY) * 0.62;
	const torso = [
		`M${n(CX - sw + c)} ${n(sY)}`,
		`L${n(CX + sw - c)} ${n(sY)}`,
		`Q${n(CX + sw)} ${n(sY)} ${n(CX + sw)} ${n(sY + c)}`,
		`L${n(CX + waist)} ${n(waistY)}`,
		`L${n(CX + hip)} ${n(hipY + 2)}`,
		`L${n(CX - hip)} ${n(hipY + 2)}`,
		`L${n(CX - waist)} ${n(waistY)}`,
		`L${n(CX - sw)} ${n(sY + c)}`,
		`Q${n(CX - sw)} ${n(sY)} ${n(CX - sw + c)} ${n(sY)}Z`,
	].join('');

	const legW = H * 0.068 * Math.sqrt(girth);
	const gap = H * 0.012;
	const footW = legW * 1.3;
	const footH = Math.max(legW * 0.5, 2.2);
	const legY = hipY - 4;
	const legH = GROUND - footH * 0.5 - legY;
	const legL: Rect = { x: n(CX - gap / 2 - legW), y: n(legY), width: n(legW), height: n(legH), rx: n(legW / 2) };
	const legR: Rect = { ...legL, x: n(CX + gap / 2) };
	const shoe = (side: -1 | 1): Ellipse => ({
		cx: n(CX + side * (gap / 2 + legW / 2 + legW * 0.12)),
		cy: n(GROUND - footH / 2),
		rx: n(footW / 2),
		ry: n(footH / 2),
	});

	const armW = H * 0.048 * Math.sqrt(girth);
	const armH = H * table(age, ARM);
	const armX = sw + armW * 0.1;
	const arm = (side: -1 | 1): Rect => ({
		x: n(CX + side * armX - armW / 2),
		y: n(sY + 1),
		width: n(armW),
		height: n(armH),
		rx: n(armW / 2),
		transform: `rotate(${side * -7} ${n(CX + side * armX)} ${n(sY + armW / 2)})`,
	});

	const neckW = r * 0.55;
	const neck: Rect = { x: n(CX - neckW / 2), y: n(cy + r * 0.6), width: n(neckW), height: n(sY - cy - r * 0.6 + 3), rx: 1 };
	const collar: Ellipse = { cx: CX, cy: n(sY + 0.6), rx: n(neckW * 0.95), ry: n(r * 0.2) };

	// The hair is two pieces: a bob behind the head, and a fringe swept to one side over the forehead.
	const Rb = r * 1.13;
	const hb = cy + r * table(age, HAIR);
	const hairBack = [
		`M${n(CX - Rb)} ${n(cy)}`,
		`A${n(Rb)} ${n(Rb)} 0 0 1 ${n(CX + Rb)} ${n(cy)}`,
		`L${n(CX + Rb * 1.03)} ${n(hb - r * 0.25)}`,
		`Q${n(CX + Rb * 1.03)} ${n(hb)} ${n(CX + Rb * 0.7)} ${n(hb)}`,
		`L${n(CX - Rb * 0.7)} ${n(hb)}`,
		`Q${n(CX - Rb * 1.03)} ${n(hb)} ${n(CX - Rb * 1.03)} ${n(hb - r * 0.25)}Z`,
	].join('');
	const Rf = r * 1.06;
	const hairFront = [
		`M${n(CX - Rf)} ${n(cy + r * 0.1)}`,
		`A${n(Rf)} ${n(Rf)} 0 0 1 ${n(CX + Rf)} ${n(cy + r * 0.1)}`,
		`Q${n(CX + r * 0.35)} ${n(cy - r * 0.62)} ${n(CX - r * 0.5)} ${n(cy - r * 0.12)}`,
		`Q${n(CX - r * 0.86)} ${n(cy + r * 0.02)} ${n(CX - Rf)} ${n(cy + r * 0.1)}Z`,
	].join('');

	const swW = H * 0.36;
	const swY = top + headH * 0.75;
	const swaddle: Rect = { x: n(CX - swW / 2), y: n(swY), width: n(swW), height: n(GROUND - swY), rx: n(swW / 2) };
	const swH = GROUND - swY;
	const fold = `M${n(CX - swW / 2)} ${n(swY + swH * 0.52)}Q${n(CX)} ${n(swY + swH * 0.36)} ${n(CX + swW / 2)} ${n(swY + swH * 0.24)}`;

	const infant = clamp((1.15 - age) / 0.25, 0, 1);
	const spread = Math.max(sw * 1.25, infant * swW * 0.6);

	return {
		top,
		head: { cx: CX, cy: n(cy), r: n(r) },
		neck,
		collar,
		torso,
		hairBack,
		hairFront,
		armL: arm(-1),
		armR: arm(1),
		legL,
		legR,
		shoeL: shoe(-1),
		shoeR: shoe(1),
		shadow: { cx: CX, cy: GROUND, rx: n(spread), ry: 2.2 },
		swaddle,
		fold,
		infant,
		hairOpacity: table(age, [[0, 0], [0.6, 0.35], [2, 1]]),
		gray: clamp((age - 45) / 14, 0, 1) * 0.85,
		trousers: clamp((age - 11) / 2, 0, 1),
		sites: {
			brain: [[CX, n(cy - r * 0.58)]],
			eyes: [
				[n(CX - r * 0.36), n(cy + r * 0.12)],
				[n(CX + r * 0.36), n(cy + r * 0.12)],
			],
			heart: [[n(CX + sw * 0.3), n(sY + (waistY - sY) * 0.3)]],
			kidneys: [
				[n(CX - waist * 0.48), n(waistY - (waistY - sY) * 0.06)],
				[n(CX + waist * 0.48), n(waistY - (waistY - sY) * 0.06)],
			],
			appendix: [[n(CX - hip * 0.45), n(waistY + (hipY - waistY) * 0.5)]],
		},
	};
}
