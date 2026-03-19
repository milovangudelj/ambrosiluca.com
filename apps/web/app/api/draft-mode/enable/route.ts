import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@repo/sanity/client";
import { token } from "@repo/sanity/token";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
