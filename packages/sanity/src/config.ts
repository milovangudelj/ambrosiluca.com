"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId, websiteUrl } from "./env";
import { resolve } from "./presentation/resolve";
import { editorSession } from "./plugins/editor-session";
import { schemaTypes, singletonTypes } from "./schema";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: "ambrosiluca.com",

  projectId,
  dataset,

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
    editorSession(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creation of new singleton documents from the "New document" menu.
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType),
      ),
  },

  document: {
    // Prevent singletons from being duplicated or deleted.
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
