// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #fff;
  }

  @media print {
    button {
      display: none !important;
    }

    @page {
      size: A4 landscape;
      margin: 10mm;
    }
  }
`;
