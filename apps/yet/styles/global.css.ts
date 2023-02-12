import { globalStyle } from "@vanilla-extract/css";
import "@styles/theme.css";
import { variables } from "@styles/theme.css";

globalStyle("::selection", {
  background: variables.color.base,
  color: "white",
});

globalStyle("body", {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.5,
  background: variables.color.brand,
  color: variables.color.base,
});

globalStyle("h1, h2, h3, h4, h5, h6, p", {
  margin: 0,
});

globalStyle("ul, ol", {
  margin: 0,
  padding: 0,
});

globalStyle("a", {
  color: variables.color.base,
});
