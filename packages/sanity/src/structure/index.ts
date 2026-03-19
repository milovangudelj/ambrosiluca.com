import type { StructureResolver } from "sanity/structure";

import { singletonTypes } from "../schema";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Info
      S.listItem()
        .title("Info")
        .child(S.document().schemaType("info").documentId("info").title("Info")),

      S.divider(),

      // All remaining document types (excluding singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string),
      ),
    ]);
