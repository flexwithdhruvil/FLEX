const EXTERNAL_URL_PATTERN = /^(https?:|data:|blob:)/i;

export function assetUrl(path: string) {
  if (!path || EXTERNAL_URL_PATTERN.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
}
