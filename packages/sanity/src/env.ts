export const projectId: string =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset: string =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion: string =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-12-01";
export const websiteUrl: string =
  process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000";
export const studioUrl: string =
  process.env.NEXT_PUBLIC_STUDIO_URL ?? "http://localhost:3333";
