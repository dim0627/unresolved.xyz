import { pressable } from "@styles/button.css";
import { borderedBox } from "@styles/layout.css";
import { tag, tags } from "@styles/tag.css";
import { variables } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const containerStyle = borderedBox;

export const headerStyle = style({
  display: "flex",
});

export const bodyStyle = style({
  padding: "1rem 1.5rem 1rem",
});

export const titleStyle = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const emojiStyle = style({
  fontSize: "2rem",
  marginTop: ".5rem",
  marginRight: "1rem",
  lineHeight: "2rem",
});

export const stacksStyle = style([
  tags,
  {
    marginTop: "1rem",
  },
]);
export const stackItemStyle = tag;

export const footerStyle = style({
  padding: "1rem 1.5rem",
  borderTop: `2px dashed ${variables.color.base}`,
});

export const linksStyle = style({
  display: "flex",
  gap: ".5rem",
  listStyle: "none",
});

export const linkItemStyle = style([
  pressable,
  {
    padding: ".5rem 1rem",
  },
]);
