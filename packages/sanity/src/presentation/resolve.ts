import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    info: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home", href: "/" }],
      }),
    }),
  },
};
