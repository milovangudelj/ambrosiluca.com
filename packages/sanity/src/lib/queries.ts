import { defineQuery } from "next-sanity";

export const INFO_QUERY = defineQuery(
  `*[_type == "info"][0]{ _id, _type, text }`,
);
