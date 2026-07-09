import { pickBySeed, pickManyBySeed } from "./slug";

/**
 * Manifest of real, already-uploaded photos, copied into /public/images by
 * scripts/copy-images.mjs (see that script for the exact slugification rules —
 * this manifest mirrors its output 1:1 so paths always resolve).
 *
 * No placeholder/fake images are used anywhere in the system — every <Image>
 * resolves to one of these real files.
 */
export const imageManifest: Record<string, string[]> = {
  "invisible-grill-balcony": [
    "i1.png", "i11.jpg", "i12.jpg", "i14.jpg", "i15.jpg", "i2.jpg", "i3.jpg", "i4.jpg",
    "i5.jpg", "i6.jpg", "i7.jpg", "i8.jpg", "i9.jpg", "n1.webp", "n2.jpg", "n22.jpg",
    "n23.avif", "n24.jpg", "n25.jpg", "n26.jpg", "n27.jpg", "n29.jpg", "n3.avif",
    "n30.jpg", "n31.jpeg", "n32.jpg", "n33.jpg", "n34.webp", "n35.jpg", "n36.jpg",
    "n37.jpg", "n38.jpg", "n39.jpg", "n4.avif", "n40.jpg", "n48.webp", "n5.jpg",
    "n6.jpg", "n7.jpg",
  ],
  "invisible-grill-window": [
    "i14.jpeg", "i16.jpg", "n21.webp", "n28.jpg", "n41.jpg", "n42.jpg", "n43.jpg",
    "n44.jpg", "n45.webp", "n46.jpg", "n47.jpg", "n49.jpg", "n50.jpg", "n51.jpg",
  ],
  "safety-nets-balcony": [
    "b-17.jpg", "b-18.jpg", "b1.jpg", "b10.jpg", "b11.jpg", "b12.jpg", "b13.jpg",
    "b14.jpg", "b15.jpg", "b16.jpg", "b2.jpg", "b3.jpg", "b5.jpg", "b6.jpg", "b8.jpg",
    "b9.jpg", "img-20260214-wa0017.jpg", "n12.jpg", "n14.jpg", "n52.jpg", "n53.jpg",
    "n54.jpg", "n55.jpg",
  ],
  "children-safety-nets": ["child-1.jpg", "child2.jpg", "child3.jpg", "child4.jpg"],
  "pet-safety-nets": ["b4.jpg", "img-20260214-wa0002.jpg", "monkey-1.jpg", "pet-1.jpg", "pet-2.jpg"],
  "duct-area-nets": [
    "car-1.jpg", "dc-1.jpg", "dc2.jpg", "dc3.jpg", "dc4.jpg", "dc5.jpg", "dc6.jpg",
    "dc7.jpg", "dc8.jpg", "indusrtial-1.jpg", "indusrties-3.jpg", "industries-2.jpg", "n13.webp",
  ],
  spikes: ["spike1.webp", "spike2.jpg", "spike3.webp", "spike4.webp", "spike5.jpg"],
  "cloth-hangers": ["cloth-1.jpg", "cloth-2.jpg", "cloth3.webp", "cloth4.jpg", "cloth5.jpg", "cloth6.webp", "cloth7.webp"],
  "cricket-nets": [
    "academy-sports.png", "n10.webp", "n11.jpg", "n8.jpg", "n9.jpg", "sp-1.jpg",
    "sp-2.jpg", "sp3.jpg", "sp4.jpg", "sp5.jpg",
  ],
  "mosquito-nets": ["mosq1.png", "mosq2.jpg", "n21.jpg", "n22.webp"],
};

export interface PageImage {
  src: string;
  alt: string;
}

function poolForCategories(categories: string[]): string[] {
  const pool: string[] = [];
  for (const category of categories) {
    const files = imageManifest[category] ?? [];
    for (const file of files) {
      pool.push(`/images/${category}/${file}`);
    }
  }
  return pool;
}

/** One deterministic hero image for a page, described with a fully descriptive alt tag. */
export function getHeroImage(imageCategories: string[], seed: string, altText: string): PageImage {
  const pool = poolForCategories(imageCategories);
  if (pool.length === 0) {
    return { src: "/images/safety-nets-balcony/b1.jpg", alt: altText };
  }
  return { src: pickBySeed(pool, `${seed}|hero`), alt: altText };
}

/** A small deterministic gallery (distinct images) for a page. */
export function getGalleryImages(imageCategories: string[], seed: string, altTextBase: string, count = 8): PageImage[] {
  const pool = poolForCategories(imageCategories);
  if (pool.length === 0) return [];
  const picks = pickManyBySeed(pool, `${seed}|gallery`, Math.min(count, pool.length));
  return picks.map((src, i) => ({ src, alt: `${altTextBase} — installation photo ${i + 1}` }));
}

/** Extra installation photos from related categories for a second gallery row. */
export function getInstallationPhotos(
  primaryCategories: string[],
  extraCategories: string[],
  seed: string,
  altTextBase: string,
  count = 6,
): PageImage[] {
  const pool = [...new Set([...poolForCategories(primaryCategories), ...poolForCategories(extraCategories)])];
  if (pool.length === 0) return [];
  const picks = pickManyBySeed(pool, `${seed}|install-photos`, Math.min(count, pool.length));
  return picks.map((src, i) => ({ src, alt: `${altTextBase} — project photo ${i + 1}` }));
}
