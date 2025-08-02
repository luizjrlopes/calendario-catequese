import React from 'react';

const MESES = [
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

const eventos = {
  '2025-08-05': 'Encontro de Catequistas',
  '2025-08-08': 'Encontro da Semana da Família (Pais, Catequizandos e Pastoral Familiar)',
  '2025-08-12': 'Filme: Irmão Sol, Irmã Lua',
  '2025-08-13': 'Filme: Versão atualizada infantil',
  '2025-08-14': 'Visita a uma família',
  '2025-08-24': 'Missa Catequética (Crisma)',
  '2025-08-31': 'Missa Dia do Catequista'
};

function gerarSemanas(ano, mes) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDia = new Date(ano, mes, 1).getDay();
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

function Impressao() {
  const ano = 2025;

  const listaEventos = Object.entries(eventos).map(([data, desc]) => ({
    dia: data.split('-')[2],
    descricao: desc
  }));

  return (
    <div className="impressao">
      <h1>Calendários para Impressão</h1>
      <div className="grade-calendarios">
        {MESES.map((mesNome, indice) => {
          const semanas = gerarSemanas(ano, indice);
          return (
            <div className="mes" key={mesNome}>
              <div className="mes-cabecalho">
                <span>{mesNome.toUpperCase()}</span>
                <span>{ano}</span>
              </div>
              <table className="mes-tabela">
                <thead>
                  <tr>
                    <th className="domingo">D</th>
                    <th>S</th>
                    <th>T</th>
                    <th>Q</th>
                    <th>Q</th>
                    <th>S</th>
                    <th>S</th>
                  </tr>
                </thead>
                <tbody>
                  {semanas.map((semana, i) => (
                    <tr key={i}>
                      {semana.map((dia, j) => {
                        if (!dia) return <td key={j}></td>;
                        const dataKey = `${ano}-${String(indice + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                        const isDomingo = new Date(ano, indice, dia).getDay() === 0;
                        const hasEvento = Boolean(eventos[dataKey]);
                        const classes = [
                          isDomingo || hasEvento ? 'dia-destaque' : ''
                        ]
                          .filter(Boolean)
                          .join(' ');
                        return (
                          <td key={j} className={classes}>
                            {dia}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div className="legenda-eventos">
        <ul>
          {listaEventos.map((ev) => (
            <li key={ev.dia}>
              <span className="dia-legenda">{ev.dia}</span> - {ev.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Impressao;
