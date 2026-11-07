// Fails when a built page links to a local path that the build did not produce.
// External links are not fetched, so the check runs offline and stays deterministic.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

function htmlFiles(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return htmlFiles(path);
		return path.endsWith('.html') ? [path] : [];
	});
}

function resolves(target) {
	if (existsSync(target) && statSync(target).isFile()) return true;
	return existsSync(join(target, 'index.html')) || existsSync(`${target}.html`);
}

const broken = [];
for (const file of htmlFiles(root)) {
	const html = readFileSync(file, 'utf8');
	for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
		if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(url)) continue;
		const path = decodeURI(url.split(/[?#]/)[0]);
		if (!path) continue;
		const target = path.startsWith('/') ? join(root, path) : resolve(dirname(file), path);
		if (!resolves(target)) broken.push(`${relative(root, file)} -> ${url}`);
	}
}

if (broken.length > 0) {
	console.error(`Broken local links (${broken.length}):\n${broken.join('\n')}`);
	process.exit(1);
}
console.log(`Local links OK in ${htmlFiles(root).length} pages.`);
