// One-off photo prep for AvaElis. Requires sharp in node_modules.
//   Thumbnails for curation (small, viewable):
//     node scripts/photos.mjs thumbs "<srcDir>" ["<outDir>"]
//   Optimise chosen shots into public/assets (long edge 1800, q80, EXIF stripped):
//     node scripts/photos.mjs build "<srcDir>" _DSF0211.jpg=danny-navy.jpg _DSF0304.jpg=danny-ava.jpg ...
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(here, "..", "public", "assets");

const [, , mode, srcDir, ...rest] = process.argv;
if (!mode || !srcDir) {
  console.error('usage: photos.mjs <thumbs|build> "<srcDir>" [args]');
  process.exit(1);
}

async function images(dir) {
  return (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
}

if (mode === "thumbs") {
  const outDir = rest[0] || path.join(srcDir, "_thumbs");
  await mkdir(outDir, { recursive: true });
  for (const f of await images(srcDir)) {
    const out = path.join(outDir, f.replace(/\.[^.]+$/, ".jpg"));
    await sharp(path.join(srcDir, f)).rotate().resize({ width: 760, height: 760, fit: "inside" }).jpeg({ quality: 68 }).toFile(out);
    const kb = Math.round((await stat(out)).size / 1024);
    console.log(`thumb  ${f} -> ${path.basename(out)} (${kb}KB)`);
  }
  console.log(`\nThumbnails in: ${outDir}`);
} else if (mode === "build") {
  if (!rest.length) { console.error("provide source=target.jpg pairs"); process.exit(1); }
  await mkdir(assetsDir, { recursive: true });
  for (const pair of rest) {
    const [name, target] = pair.split("=");
    const src = path.join(srcDir, name);
    if (!target || !existsSync(src)) { console.error(`SKIP (missing): ${pair}`); continue; }
    const out = path.join(assetsDir, target);
    const info = await sharp(src).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    console.log(`built  ${target}  ${Math.round(info.size / 1024)}KB  ${info.width}x${info.height}`);
  }
} else {
  console.error(`unknown mode: ${mode}`);
  process.exit(1);
}
