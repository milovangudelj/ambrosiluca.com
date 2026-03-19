"use client";

import { useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";

import { disableDraftMode } from "~/app/actions";

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  // Only show outside of Presentation Tool
  if (isPresentationTool) {
    return null;
  }

  const handleDisable = () =>
    startTransition(() => disableDraftMode());

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {pending ? (
        <span className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700">
          Disabling draft mode...
        </span>
      ) : (
        <button
          type="button"
          onClick={handleDisable}
          className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 shadow-md transition-colors hover:bg-gray-200"
        >
          Disable Draft Mode
        </button>
      )}
    </div>
  );
}
