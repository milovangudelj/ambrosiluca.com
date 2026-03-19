import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const info = defineType({
  name: "info",
  title: "Info",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      text: "text",
    },
    prepare({ text }) {
      return {
        title: "Info",
        subtitle: typeof text === "string" ? text.slice(0, 80) : undefined,
      };
    },
  },
});
