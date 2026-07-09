/** Slug + deterministic-hash utilities shared across the content and quality-scoring engines. */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Simple, fast, deterministic string hash (djb2). Good enough for seeded variant selection — not for security. */
export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash >>> 0);
}

/** Deterministically pick one item from an array using a seed string. Same seed always returns the same item. */
export function pickBySeed<T>(items: readonly T[], seed: string): T {
  if (items.length === 0) {
    throw new Error("pickBySeed: items array is empty");
  }
  const index = hashString(seed) % items.length;
  return items[index];
}

/** Deterministically pick N distinct items from an array using a seed string. */
export function pickManyBySeed<T>(items: readonly T[], seed: string, count: number): T[] {
  if (items.length === 0) return [];
  const start = hashString(seed) % items.length;
  const result: T[] = [];
  for (let i = 0; i < Math.min(count, items.length); i++) {
    result.push(items[(start + i) % items.length]);
  }
  return result;
}

export function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function titleCase(input: string): string {
  return input.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Replaces {key} placeholders in a template string with values from `vars`. */
export function renderTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}
