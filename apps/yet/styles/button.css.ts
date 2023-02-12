import { variables } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const pressable = style({
  display: "inline-flex",
  border: `1px solid ${variables.color.base}`,
  borderRadius: "1rem",
  boxShadow: `0 4px 0 0 rgba(51, 51, 51, .1)`,
});
