import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { SanityLive } from "@repo/sanity/live";
import { DisableDraftMode } from "~/components/DisableDraftMode";
import { EditorBanner } from "~/components/EditorBanner";

/**
 * Website layout — wraps all public-facing pages.
 *
 * Renders SanityLive (real-time updates) and, when draft mode is enabled,
 * VisualEditing overlays + a button to exit draft mode.
 *
 * This layout is intentionally NOT applied to the /studio route.
 * See: https://www.sanity.io/docs/visual-editing#embedded-studios
 */
export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SanityLive />
      <EditorBanner />
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
