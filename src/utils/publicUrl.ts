/** URL for a file served from Vite `public/`, honoring `base` (e.g. GitHub Pages `/FLEX/`). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${trimmed}`;
}
