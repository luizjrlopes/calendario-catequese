import styled from 'styled-components';

export const FolhaImpressao = styled.div`
  font-family: Arial, sans-serif;
  padding: 10mm;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex-wrap: wrap;

  @media print {
    .mes:nth-child(3n) {
      page-break-after: always;
    }
    .mes:last-child {
      page-break-after: auto;
    }
  }
`;

export const CalendarioImpressao = styled.div`
  border: 1px solid #ccc;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

export const CabecalhoMes = styled.div`
  background: #d30000;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 4px 6px;
  font-size: 14px;
`;

export const TabelaMes = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ccc;
    width: 14.28%;
    height: 24px;
    text-align: center;
    font-size: 12px;
  }

  th {
    background: #999;
    color: white;
    padding: 2px;
    font-weight: normal;
  }

  th.domingo {
    background: #d30000;
  }
`;

export const TdDia = styled.td`
  color: ${props => props.vermelho ? '#d30000' : 'black'};
  font-weight: ${props => props.vermelho ? 'bold' : 'normal'};
`;

export const EventosLista = styled.ul`
  list-style: none;
  padding: 6px;
  font-size: 12px;

  li {
    margin-bottom: 3px;
  }
`;

export const DataEvento = styled.span`
  color: #d30000;
  font-weight: bold;
`;

export const FasesLua = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 6px;
  font-size: 10px;

  span {
    white-space: nowrap;
  }
`;
