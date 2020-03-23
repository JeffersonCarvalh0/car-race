import { createGlobalStyle } from 'styled-components';
import RetroGamingTtf from './fonts/RetroGaming.ttf';
import RetroGamingWoff from './fonts/RetroGaming.woff';
import RetroGamingWoff2 from './fonts/RetroGaming.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Retro Gaming";
    src: url(${RetroGamingTtf}) format("truetype"),
         url(${RetroGamingWoff}) format("woff"),
         url(${RetroGamingWoff2}) format("woff2");
  }

  body {
    padding: 0;
    margin: 0;
    font-family: Retro Gaming;
    font-size: calc(1em + 1vw);
  }

  button {
    font-family: Retro Gaming;
    font-size: inherit;
  }

  input {
    font-family: Retro Gaming;
    font-size: inherit;
  }
`;

export default GlobalStyle;
