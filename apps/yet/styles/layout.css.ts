import { variables } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const borderedBox = style({
  border: `2px solid ${variables.color.base}`,
  borderRadius: "1.5rem",
  boxShadow: `0 0 0 .3rem ${variables.color.brand}, 0 0 0 .4rem rgba(51, 51, 51, .09)`,
});
