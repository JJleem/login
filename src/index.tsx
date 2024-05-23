import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme/theme";

const GlobalStyle = createGlobalStyle`

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    color:${(props) => props.theme.textColor}
  }
  body {
    font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
  }
  ul,li {
    list-style:none;
  }
a{
  color:inherit;
  text-decoration:none;
}

`;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
