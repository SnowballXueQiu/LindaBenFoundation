function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, "")).trim();
}

function attributeValue(rawAttributes: string, name: string) {
  return rawAttributes.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1]?.trim() || "";
}

function mediaKeyFromSrc(src: string) {
  const value = decodeHtmlEntities(src.trim());
  const mediaPrefix = "/api/media/";
  if (value.startsWith(mediaPrefix)) return decodeURIComponent(value.slice(mediaPrefix.length));

  try {
    const url = new URL(value);
    if (url.pathname.startsWith(mediaPrefix)) return decodeURIComponent(url.pathname.slice(mediaPrefix.length));
  } catch {
    // Relative paths are handled above.
  }

  return value;
}

function looksLikeLegacyHtml(value: string) {
  return /<\/?(p|h1|h2|h3|ul|ol|li|img|strong|em|b|i|a)\b/i.test(value);
}

export function normalizeArticleMarkdown(value: string) {
  if (!looksLikeLegacyHtml(value)) return value.trim();

  let next = value;

  next = next.replace(/<img\b([^>]*)>/gi, (_match, rawAttributes: string) => {
    const src = attributeValue(rawAttributes, "src");
    const alt = attributeValue(rawAttributes, "alt");
    if (!src) return "";
    const key = mediaKeyFromSrc(src);
    const altAttribute = alt ? ` alt="${decodeHtmlEntities(alt).replace(/"/g, "&quot;")}"` : "";
    return `\n\n<attach${altAttribute}>${key}</attach>\n\n`;
  });

  next = next
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, (_match, content: string) => `\n\n# ${stripTags(content)}\n\n`)
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_match, content: string) => `\n\n## ${stripTags(content)}\n\n`)
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, (_match, content: string) => `\n\n### ${stripTags(content)}\n\n`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_match, content: string) => `\n- ${stripTags(content)}`)
    .replace(/<\/?(ul|ol)\b[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_match, _tag: string, content: string) => `**${stripTags(content)}**`)
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_match, _tag: string, content: string) => `_${stripTags(content)}_`)
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_match, rawAttributes: string, content: string) => {
      const href = attributeValue(rawAttributes, "href");
      const label = stripTags(content);
      return href ? `[${label}](${decodeHtmlEntities(href)})` : label;
    })
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_match, content: string) => `\n\n${stripTags(content)}\n\n`)
    .replace(/<\/?(div|span|section|article)\b[^>]*>/gi, "\n");

  return decodeHtmlEntities(next)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
