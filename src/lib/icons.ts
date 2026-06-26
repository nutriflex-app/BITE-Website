// Single inline-SVG factory for the whole site. Replaces the two duplicated
// factories that used to live in index.astro (step/composer icons at 24/1.8 and
// trust icons at 20/1.7). Returns an SVG string for use with set:html.
interface IconOpts {
  size?: number;
  stroke?: number;
}

const PATHS: Record<string, string> = {
  spark: '<path d="M12 3l1.9 4.6L18.5 9l-4.6 1.9L12 15l-1.9-4.1L5.5 9l4.6-1.4L12 3z"/><path d="M19 14l.8 1.9 1.9.8-1.9.8L19 20l-.8-1.5-1.9-.8 1.9-.8.8-1.9z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
  book: '<path d="M12 6.5C10.5 5 8 4.5 4 5v12c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5z"/><path d="M12 6.5V18"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5H5l2.2 11.1a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6.2"/>',
  camera: '<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z"/><circle cx="12" cy="13" r="3.2"/>',
  chat: '<path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V16H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5z"/><path d="M8 10.5h8M8 13.5h5"/>',
  chart: '<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M7.5 14.5l3.2-3.4 2.6 2.1 4.2-5.2"/><path d="M17.5 6v3.5H14"/>',
  barcode: '<path d="M3.5 6v12M7 6v12M10.5 6v12M14 6v12M17.5 6v12M21 6v12"/>',
  mic: '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
  trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
};

export function icon(key: string, { size = 24, stroke = 1.8 }: IconOpts = {}): string {
  const body = PATHS[key];
  if (!body) return '';
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
