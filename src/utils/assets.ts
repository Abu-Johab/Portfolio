/**
 * Resolves a public asset path against Vite's BASE_URL to work correctly on GitHub Pages
 * (or any subpath deployment).
 */
export function getAssetUrl(path: string | undefined): string {
  if (!path) return '';
  // If it's already an absolute HTTP/HTTPS URL or data URI, return as-is
  if (/^(https?:|\/\/|data:)/i.test(path)) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';

  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
}
