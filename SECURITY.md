# Security Notes

This is a static, frontend-only Vue 3 + Vite portfolio site deployed to GitHub Pages. There is no
backend, API, authentication, or user data storage — most classic web app vulnerability classes
(SQLi, auth bypass, session hijacking, SSRF) don't apply.

## Known, accepted limitations

- **Clickjacking / framing protection is not enforced.** `frame-ancestors`, `X-Frame-Options`, and
  `X-Content-Type-Options` can only be set via real HTTP response headers, never via a `<meta>`
  tag, and GitHub Pages does not allow custom response headers. The `Content-Security-Policy`
  `<meta>` tag in `index.html` covers script/style/img/connect/frame source restrictions instead.
- **HSTS is not set** for the same reason (header-only, GitHub Pages doesn't support custom
  headers). GitHub Pages already serves over HTTPS with automatic HTTP→HTTPS redirection.
- **The Google Analytics loader script has no Subresource Integrity (`integrity`) attribute.**
  Google serves `gtag.js` from a dynamically-versioned URL and does not publish a stable hash to
  pin against, so SRI is not practically applicable to this script. This is an accepted
  third-party trust dependency, not an oversight.
- **`script-src` includes `'unsafe-eval'`.** Spotify's embed SDK
  (`embed-cdn.spotifycdn.com/.../iframe_api.js`, loaded by `SpotifyComponent.vue`) calls
  `eval`/`new Function` internally to construct the playlist embed; without this allowance the
  Music dialog opens but the player never renders. `'unsafe-eval'` only permits dynamic code
  evaluation inside scripts already allowed by `script-src` (self, Google Analytics, Spotify) — it
  does not allow loading arbitrary new `<script>` tags from unlisted origins. Residual risk: if any
  allowed script origin is ever compromised, it could eval attacker-supplied strings. Accepted as
  the lesser regression versus a broken core feature.

## Reporting

This is a personal portfolio project. If you find a security issue, open a GitHub issue on the
repository.
