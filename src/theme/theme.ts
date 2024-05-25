import { DefaultTheme } from "styled-components";

const size = {
  xs: "391px",
};

export const theme: DefaultTheme = {
  textColor: "#929294;",
  boardColor: "#dadfe9",
  cardColor: "#fff",
  xs: `(max-width: ${size.xs})`,
};
