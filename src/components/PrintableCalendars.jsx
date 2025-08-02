import React from 'react';
import './PrintableCalendars.css';

export const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function gerarSemanas(ano, mesIndex) {
  const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate();
  const primeiroDia = new Date(ano, mesIndex, 1).getDay();
  const semanas = [];
  let semana = new Array(primeiroDia).fill(null);
  for (let dia = 1; dia <= diasNoMes; dia++) {
    semana.push(dia);
    if (semana.length === 7) {
      semanas.push(semana);
      semana = [];
    }
  }
  if (semana.length > 0) {
    while (semana.length < 7) semana.push(null);
    semanas.push(semana);
  }
  return semanas;
}

function iconForPhase(fase) {
  const icons = {
    CRESC: '🌓',
    CHEIA: '🌕',
    MING: '🌗',
    NOVA: '🌑'
  };
  return icons[fase] || '';
}

function labelForPhase(fase) {
  const labels = {
    CRESC: 'Crescente',
    CHEIA: 'Cheia',
    MING: 'Minguante',
    NOVA: 'Nova'
  };
  return labels[fase] || '';
}

function Calendario({ data }) {
  const mesIndex = MESES.indexOf(data.mes);
  const semanas = gerarSemanas(data.ano, mesIndex);

  const eventosMap = data.eventos.reduce((acc, ev) => {
    acc[ev.dia] = acc[ev.dia] ? [...acc[ev.dia], ev] : [ev];
    return acc;
  }, {});

  const fases = data.fasesLua || {};

  return (
    <div className="calendario-print" style={{ pageBreakInside: 'avoid' }}>
      <header className="mes-header">
        <h2>{data.mes} <span className="ano">{data.ano}</span></h2>
      </header>
      <table className="mes-tabela">
        <thead>
          <tr>
            {SEMANA.map((d, i) => (
              <th key={i} className={i === 0 ? 'domingo' : ''}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanas.map((sem, i) => (
            <tr key={i}>
              {sem.map((dia, j) => {
                const isSunday = j === 0;
                const hasEvent = dia && eventosMap[dia];
                const fase = dia && fases[dia];
                const classes = [];
                if (isSunday) classes.push('domingo');
                if (hasEvent) classes.push('has-evento');
                return (
                  <td key={j} className={classes.join(' ')}>
                    {dia}
                    {fase && <span className="fase-lua">{iconForPhase(fase)}</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="lista-eventos">
        {data.eventos.map((ev) => (
          <li key={ev.dia}>
            <span className="dia">{String(ev.dia).padStart(2, '0')}</span>
            <span className="titulo">{ev.titulo}</span>
            {ev.subtitulo && <span className="subtitulo"> - {ev.subtitulo}</span>}
          </li>
        ))}
      </ul>
      <div className="fases-lua">
        {Object.entries(fases).map(([dia, fase]) => (
          <div key={dia} className="fase-item">
            <span className="dia">{String(dia).padStart(2, '0')}</span>
            <span className="icone">{iconForPhase(fase)}</span>
            <span className="label">{labelForPhase(fase)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrintableCalendars({ calendarios }) {
  const pages = chunk(calendarios, 3);
  return (
    <div className="print-wrapper">
      {pages.map((grupo, i) => (
        <div key={i} className="pagina-calendarios">
          {grupo.map((cal) => (
            <Calendario key={`${cal.mes}-${cal.ano}`} data={cal} />
          ))}
        </div>
      ))}
    </div>
  );
}

