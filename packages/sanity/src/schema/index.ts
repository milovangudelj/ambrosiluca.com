import type { SchemaPluginOptions } from "sanity";

import { info } from "./documents/info";

export const schemaTypes: SchemaPluginOptions["types"] = [info];

/** Document types that should be treated as singletons. */
export const singletonTypes: Set<string> = new Set(["info"]);
