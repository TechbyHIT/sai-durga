/**
 * Copies the source photo library from /images (already provided by the business)
 * into /public/images with URL-safe, SEO-friendly filenames.
 *
 * This keeps the real, already-uploaded photos as the single source of truth
 * (no new/fake images are generated) while making them servable by Next.js,
 * which can only serve static assets from /public.
 *
 * Safe to re-run: it is idempotent and will not create duplicate files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "images");
const TARGET_DIR = path.join(ROOT, "public", "images");

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-]/g, "")
    .replace(/-+/g, "-");
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.log("[copy-images] No /images source folder found, skipping.");
    return;
  }

  fs.mkdirSync(TARGET_DIR, { recursive: true });

  const categories = fs
    .readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  let copied = 0;
  let skipped = 0;
  const manifest = {};

  for (const category of categories) {
    const categorySlug = slugify(category.name);
    const sourceCategoryDir = path.join(SOURCE_DIR, category.name);
    const targetCategoryDir = path.join(TARGET_DIR, categorySlug);
    fs.mkdirSync(targetCategoryDir, { recursive: true });

    const files = fs
      .readdirSync(sourceCategoryDir, { withFileTypes: true })
      .filter((entry) => entry.isFile());

    const usedNames = new Set();
    manifest[categorySlug] = [];

    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXT.has(ext)) {
        continue; // skip PDFs and any non-image assets
      }

      let targetName = slugify(file.name);
      if (usedNames.has(targetName)) {
        const base = targetName.replace(ext, "");
        let i = 2;
        while (usedNames.has(`${base}-${i}${ext}`)) i++;
        targetName = `${base}-${i}${ext}`;
      }
      usedNames.add(targetName);

      const sourcePath = path.join(sourceCategoryDir, file.name);
      const targetPath = path.join(targetCategoryDir, targetName);

      if (
        fs.existsSync(targetPath) &&
        fs.statSync(targetPath).size === fs.statSync(sourcePath).size
      ) {
        skipped++;
      } else {
        fs.copyFileSync(sourcePath, targetPath);
        copied++;
      }

      manifest[categorySlug].push(targetName);
    }
  }

  fs.writeFileSync(
    path.join(TARGET_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(
    `[copy-images] Done. Copied ${copied} file(s), skipped ${skipped} already up to date. Categories: ${
      Object.keys(manifest).length
    }.`,
  );
}

main();
