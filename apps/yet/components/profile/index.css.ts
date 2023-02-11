import { variables } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

export const heroStyle = style({
  display: "flex",
  height: "40vh",
  alignItems: "center",
  "@media": {
    "screen and (max-width: 750px)": {
      display: "block",
    },
  },
});

export const headingStyle = style({
  display: "flex",
  marginBottom: "1.5rem",
  alignItems: "center",
  "@media": {
    "screen and (max-width: 750px)": {
      flexDirection: "column",
    },
  },
});

export const thumbnailStyle = style({
  marginRight: "2rem",
  borderRadius: "12%",
  boxShadow: `0 0 0 .3rem ${variables.color.brand}, 0 0 0 .4rem ${variables.color.base}`,
});

export const nameStyle = style({
  fontSize: "3rem",
  "@media": {
    "screen and (max-width: 750px)": {
      marginTop: "1rem",
    },
  },
});

export const detailStyle = style({ marginTop: "3rem" });
globalStyle(`${detailStyle} h2`, {
  margin: "2rem 0 1rem",
  fontSize: "1.4rem",
});
globalStyle(`${detailStyle} p`, {
  margin: "1rem 0",
});
globalStyle(`${detailStyle} ul, ${detailStyle} ol`, {
  paddingLeft: "1.5rem",
});
