// Shared by the skills preview (home page) and the full skills page.

const OTHER = 'Other';

// Display order of category sections. Anything not listed goes after these (A-Z), then "Other".
export const CATEGORY_ORDER = ['Languages', 'Frontend', 'Backend', 'Database', 'AI / ML', 'Tools', 'Integrations & Tools'];

// Complete class strings (not built from pieces) so Tailwind can see and generate them.
const TOOLS_STYLE = 'border-slate-200 bg-slate-100 text-slate-700';
const CATEGORY_STYLES = {
  Languages: 'border-amber-200 bg-amber-50 text-amber-700',
  Frontend: 'border-sky-200 bg-sky-50 text-sky-700',
  Backend: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Database: 'border-teal-200 bg-teal-50 text-teal-700',
  'AI / ML': 'border-violet-200 bg-violet-50 text-violet-700',
  Tools: TOOLS_STYLE,
  'Integrations & Tools': TOOLS_STYLE,
};

const EMOJI_ICONS = {
  react: '⚛️',
  'node.js': '🟩',
  express: '🚂',
  'express.js': '🚂',
  mongodb: '🍃',
  'tailwind css': '🌊',
  python: '🐍',
  javascript: '🟨',
  'javascript (es6+)': '🟨',
  html5: '🌐',
  css3: '🎨',
  git: '🔀',
  'git & github': '🔀',
  postman: '📮',
};

// "AI/ML", "ai / ml" and "AI / ML" are the same category.
const squash = (text) => text.toLowerCase().replace(/\s+/g, '');

/** Tidy a category typed in the CMS: trims, merges spelling variants of known ones, "" -> "Other". */
export function canonicalCategory(raw) {
  const trimmed = (raw ?? '').toString().trim();
  if (!trimmed) return OTHER;
  const known = [...CATEGORY_ORDER, OTHER].find((name) => squash(name) === squash(trimmed));
  return known ?? trimmed;
}

export function categoryStyle(category) {
  return CATEGORY_STYLES[canonicalCategory(category)] ?? TOOLS_STYLE;
}

export function compareCategories(a, b) {
  if (a === b) return 0;
  if (a === OTHER) return 1; // "Other" is always last
  if (b === OTHER) return -1;
  const indexA = CATEGORY_ORDER.indexOf(a);
  const indexB = CATEGORY_ORDER.indexOf(b);
  if (indexA === -1 && indexB === -1) return a.localeCompare(b);
  if (indexA === -1) return 1; // unknown categories come after the known ones
  if (indexB === -1) return -1;
  return indexA - indexB;
}

/** Flat skills -> [{ key, category, skills }] in display order. Order inside a group is kept from the CMS. */
export function groupByCategory(skills) {
  const groups = new Map();
  for (const skill of skills ?? []) {
    const category = canonicalCategory(skill.category);
    const key = squash(category);
    if (!groups.has(key)) groups.set(key, { key, category, skills: [] });
    groups.get(key).skills.push(skill);
  }
  return [...groups.values()].sort((a, b) => compareCategories(a.category, b.category));
}

export function skillEmoji(name) {
  return EMOJI_ICONS[(name ?? '').toString().trim().toLowerCase()] ?? null;
}

const IMAGE_URL = /^(https?:)?\/\//i;
const IMAGE_FILE = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i;

/**
 * The CMS "icon" field is usually the URL of an uploaded image, but an admin can also type an emoji.
 * -> { type: 'image', src } | { type: 'text', text } | { type: 'none' }
 */
export function iconKind(icon) {
  const value = (icon ?? '').toString().trim();
  if (!value) return { type: 'none' };
  if (IMAGE_URL.test(value) || value.startsWith('/') || IMAGE_FILE.test(value)) return { type: 'image', src: value };
  // A short value with no letters or digits is an emoji/symbol; anything else (e.g. "react") is not an icon.
  if (!/[A-Za-z0-9]/.test(value) && Array.from(value).length <= 8) return { type: 'text', text: value };
  return { type: 'none' };
}