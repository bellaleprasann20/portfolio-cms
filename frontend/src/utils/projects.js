/** Trim a URL typed by hand (" https://x.dev" -> "https://x.dev"). Returns null for empty or "#". */
export function cleanUrl(url) {
  const value = (url ?? '').toString().trim();
  if (!value || value === '#') return null;
  if (/^https?:\/\//i.test(value) || value.startsWith('/')) return value; // absolute, or a /public path
  return `https://${value}`;
}

function toTags(raw) {
  const value = raw.tech_stack ?? raw.tags ?? raw.techStack ?? [];
  const list = Array.isArray(value) ? value : String(value).split(',');
  return list.map((tag) => String(tag).trim()).filter(Boolean);
}

/**
 * One shape for the whole site. Accepts what the CMS API returns and the older hand-written shapes
 * (tags / techStack, github / githubLink, live / liveLink, imageUrl, _id), so no component cares.
 */
export function normalizeProject(raw) {
  const images = (Array.isArray(raw.images) ? raw.images : []).map(cleanUrl).filter(Boolean);
  const githubUrl = cleanUrl(raw.github_url ?? raw.githubLink ?? raw.github);
  let liveUrl = cleanUrl(raw.live_url ?? raw.liveLink ?? raw.live);
  // A "live demo" that is just the GitHub repo again is not a live demo.
  if (liveUrl && githubUrl && liveUrl.toLowerCase() === githubUrl.toLowerCase()) liveUrl = null;

  return {
    id: raw.id ?? raw._id ?? raw.slug,
    slug: raw.slug,
    title: raw.title ?? '',
    summary: raw.short_description ?? raw.summary ?? raw.description ?? '',
    description: raw.description ?? raw.short_description ?? '',
    image: cleanUrl(raw.thumbnail ?? raw.imageUrl ?? raw.image) ?? images[0] ?? null,
    images,
    tags: toTags(raw),
    githubUrl,
    liveUrl,
    featured: Boolean(raw.is_featured ?? raw.featured),
  };
}

/** Featured projects first (keeping their order), then the rest, up to `count`. */
export function selectFeatured(projects, count) {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);
  return [...featured, ...others].slice(0, count);
}

/** Split plain text into paragraphs on blank lines. */
export function paragraphs(text) {
  return (text ?? '')
    .toString()
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}