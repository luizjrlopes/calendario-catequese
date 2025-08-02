import styled from "styled-components";

export const Folha = styled.div`
  background: #fff;
  padding: 0.5cm 0.6cm;
  min-height: 99vh;
  width: 100vw;
  box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  font-family: Arial, sans-serif;

  @media print {
    background: #fff;
    padding: 0.4cm;
  }
`;

export const LinhaCalendarios = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;

  @media print {
    page-break-after: always;
    &:last-child {
      page-break-after: avoid;
    }
  }
`;



export const Header = styled.div`
  background: #d30000;
  color: #fff;
  font-size: 2.1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2px 12px 3px;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;

  .year {
    font-size: 1.3rem;
    font-weight: 400;
    opacity: 0.8;
  }
`;

export const CalendarCard = styled.div`
  width: 9.1cm;
  min-height: 11.5cm;
  background: #fff;
  border-radius: 4px;
  border: 1.5px solid #eee;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin-bottom: 0.3cm;
  padding: 0; /* remove padding extra */
  overflow: hidden; /* contém qualquer estouro */

  @media print {
    box-shadow: none;
    border: 1px solid #d30000;
    page-break-inside: avoid;
  }
`;

export const CalendarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin: 0.15cm 0 0 0; /* reduz margem superior */
  table-layout: fixed; /* força colunas distribuídas sem overflow */
  th,
  td {
    width: 14.28%;
    height: 1cm; /* reduz um pouco para caber melhor */
    text-align: center;
    font-size: 1rem; /* escala ligeiramente menor para evitar estourar */
    font-weight: bold;
    border: 1px solid #ededed;
    padding: 2px; /* espaçamento interno mínimo */
    vertical-align: middle;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Th = styled.th`
  background: ${({ domingo }) => (domingo ? "#eee" : "#999")};
  color: ${({ domingo }) => (domingo ? "#d30000" : "#fff")};
  font-weight: ${({ domingo }) => (domingo ? "bold" : "normal")};
  font-size: 1.05rem; /* ligeiro ajuste para caber */
  padding: 4px 2px;
  box-sizing: border-box;
`;

export const Td = styled.td`
  color: ${({ domingo }) => (domingo ? "#d30000" : "#222")};
  background: ${({ evento }) => (evento ? "#ffeaea" : "#fff")};
  font-weight: bold;
  position: relative;
`;

export const Legenda = styled.div`
  margin: 18px 0 8px 0;
  font-size: 1rem;
  min-height: 1.3cm;
  padding: 0.2cm 0.5cm 0.1cm 0.5cm; /* padding em todos os lados */

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-bottom: 6px;   /* Deixa mais separado */
    line-height: 1.45;
    word-break: break-word;
  }
  .event-date {
    color: #d30000;
    font-weight: bold;
    margin-right: 6px;
    font-size: 1.09em;
  }
`



export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5cm;
  margin: 8px 0 3px 0;
  font-size: 0.98rem;

  .fase {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
    .fase-icon {
  font-size: 1rem;
  line-height: 1;
}

  .bolinha {
    width: 0.45cm;
    height: 0.45cm;
    border-radius: 50%;
    display: inline-block;
    margin-right: 3px;
    border: 1.5px solid #222;
    background: #fff;
    vertical-align: middle;
  }
  .cheia {
    background: #222;
  }
  .ming {
    background: #222;
    border: 2px solid #fff;
  }
  .nova {
    background: #fff;
  }
  .cresc {
    background: #fff;
  }
`;
