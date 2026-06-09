import sharp from 'sharp';
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'src/assets';
const MAX_W = 2000;            // largeur max d'affichage réelle
const THRESHOLD = 900 * 1024; // ne retouche que les fichiers > ~900 Ko

async function walk(dir) {
  const out = [];
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) out.push(...await walk(p));
    else if (d.isFile() && d.name.toLowerCase().endsWith('.webp')) out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
let totalIn = 0, totalOut = 0, done = 0, skipped = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  if (before < THRESHOLD) { skipped++; continue; }

  const meta = await sharp(file).metadata();
  // Lecture + encodage en mémoire, puis écrasement (évite le verrou fichier Windows)
  const buf = await sharp(file)
    .rotate()
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();
  await writeFile(file, buf);

  totalIn += before; totalOut += buf.length; done++;
  const w = Math.min(MAX_W, meta.width || MAX_W);
  console.log(`${path.basename(file)}  ${meta.width}px ${(before/1e6).toFixed(1)}MB -> ${w}px ${(buf.length/1e6).toFixed(2)}MB`);
}

console.log(`\n${done} redimensionnées, ${skipped} déjà légères`);
if (done) console.log(`Total retouché: ${(totalIn/1e6).toFixed(1)}MB -> ${(totalOut/1e6).toFixed(1)}MB (-${((1-totalOut/totalIn)*100).toFixed(0)}%)`);
