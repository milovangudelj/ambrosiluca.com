import { definePlugin } from "sanity";

/**
 * Sets a `sanity_editor` cookie on the root domain when a user is
 * authenticated in the Studio. The website reads this cookie to show
 * an "Open Studio" prompt to known editors.
 *
 * The cookie carries no sensitive data — it is a simple flag (`1`).
 * It is set with `SameSite=Lax` and a 30-day expiry.
 */
export const editorSession = definePlugin(() => {
  if (typeof document !== "undefined") {
    // Derive the root domain so the cookie is shared across subdomains.
    // e.g. "studio.ambrosiluca.com" → ".ambrosiluca.com"
    // For localhost, omit the domain attribute (defaults to current host).
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1";
    const domainParts = hostname.split(".");
    const rootDomain =
      domainParts.length >= 2
        ? `.${domainParts.slice(-2).join(".")}`
        : hostname;

    const domainAttr = isLocalhost ? "" : `domain=${rootDomain};`;
    const maxAge = 60 * 60 * 24 * 30; // 30 days

    document.cookie = `sanity_editor=1;${domainAttr}path=/;max-age=${maxAge};SameSite=Lax`;
  }

  return {};
});
