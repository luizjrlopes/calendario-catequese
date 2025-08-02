// src/styles/global.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #fff;
    color: #111;
  }

  // Impede o Chrome/Safari de remover o fundo na impressão


  @media print {
   * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
    html, body {
      width: 297mm;
      height: 210mm;
      background: #fff !important;
      color: #111 !important;
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box;
      font-size: 12pt;
    }

    // Remove botões e elementos indesejados
    button, .no-print, nav, .oculta-impressao {
      display: none !important;
    }

    // Aplica cor exata no cabeçalho de impressão (ajuste a classe conforme seu componente)
    .header-impressao,
    .header-impressao * {
      background: #d30000 !important;
      color: #fff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    // Remove sombra/borda e mantém layout sem margens
    .calendar-print-card,
    .calendar-print-card * {
      box-shadow: none !important;
      border-color: #d30000 !important;
    }

    @page {
      size: A4 landscape;
      margin: 10mm;
    }
  }
`;
