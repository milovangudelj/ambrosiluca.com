"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId, websiteUrl } from "@repo/sanity/env";
import { resolve } from "@repo/sanity/presentation";
import { schemaTypes, singletonTypes } from "@repo/sanity/schema";
import { structure } from "@repo/sanity/structure";

/**
 * Studio configuration for the embedded studio at /studio.
 * Re-creates the shared config with basePath set to "/studio".
 */
export default defineConfig({
  name: "default",
  title: "ambrosiluca.com",

  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: websiteUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType),
      ),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action),
          )
        : input,
  },
});
