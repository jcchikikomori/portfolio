/**
 * Resolves a root-absolute asset path to the correct URL based on Vite's base config.
 * On GitHub Pages (subpath deployment), prepends import.meta.env.BASE_URL.
 * On Vercel/root deployment, BASE_URL is '/' so the path is unchanged.
 *
 * @param {string|null|undefined} path - The asset path (e.g., '/img/logos/engagia-logo.png')
 * @returns {string|null|undefined} The resolved URL, or the input unchanged for non-asset paths
 */
export function assetUrl(path) {
  if (!path) { return path; }
  // Pass through external URLs and data URIs unchanged
  if (/^(?:https?:|data:|blob:|mailto:|tel:)/.test(path)) { return path; }
  // Strip leading slash and prepend BASE_URL (always ends with /)
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
