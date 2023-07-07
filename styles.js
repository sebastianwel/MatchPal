import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0px;
    font-family: system-ui;
    padding: 0;
    background: var(--app-background-color);
    font-family: var(--main-font);
    color: var(--text-color)
  }

  :root{
    --main-font: avenir;
    --header-color: #9300e9;
    --app-background-color: #FFF8FB;
    --card-background-color: #fff;
    --text-color: #283149;
    --isActive-color: #0079ff;
    --isInactive-color: #283149;
  }
`;
