import { createGlobalTheme } from "@vanilla-extract/css";

export const variables = createGlobalTheme(":root", {
  color: {
    brand: "rgb(253, 206, 18)",
    base: "rgb(51, 51, 51)",
  },
});
