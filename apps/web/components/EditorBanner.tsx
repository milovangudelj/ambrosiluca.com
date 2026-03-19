"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";

// Cookies don't have a native change event, so we use a no-op subscribe.
// The banner only checks once on mount via getEditorSnapshot.
const noop = () => () => {};


function getEditorSnapshot(): boolean {
  if (typeof document === "undefined") return false;

  const hasEditorCookie = document.cookie
    .split("; ")
    .some((c) => c.startsWith("sanity_editor="));
  const wasDismissed = sessionStorage.getItem("editor_banner_dismissed");

  return hasEditorCookie && !wasDismissed;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Detects if the visitor has a `sanity_editor` cookie (set by the
 * editor-session Studio plugin) and shows a subtle banner linking
 * to the Studio.
 *
 * The banner is dismissible — dismissal is stored in sessionStorage
 * so it reappears on the next browser session.
 */
export function EditorBanner() {
  const isEditor = useSyncExternalStore(
    noop,
    getEditorSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  if (!isEditor || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem("editor_banner_dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded bg-black/90 px-4 py-2 text-sm text-white shadow-lg">
      <span>You appear to be an editor.</span>
      <Link
        href="/studio"
        className="font-medium underline underline-offset-2 transition-colors hover:text-gray-300"
      >
        Go to Studio
      </Link>
      <button
        type="button"
        onClick={handleDismiss}
        className="ml-1 text-gray-400 transition-colors hover:text-white"
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}
