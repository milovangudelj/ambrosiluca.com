import type { Metadata } from "next";

import { frama } from '~/styles/fonts'

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Luca Ambrosi",
  description: "Personal website of Luca Ambrosi.",
};

/**
 * Root layout — bare HTML shell.
 *
 * SanityLive and VisualEditing are rendered in the (website) route group
 * layout to keep them out of the /studio route.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${frama.variable}`}>
      <body>{children}</body>
    </html>
  );
}
