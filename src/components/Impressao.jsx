import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
  const [eventos, setEventos] = useState({});

  useEffect(() => {
    const carregar = async () => {
      const q = query(collection(db, 'eventos'), where('ano', '==', ano));
      const snapshot = await getDocs(q);
      const mapa = {};
      snapshot.forEach((d) => {
        const ev = d.data();
        const chave = `${ev.ano}-${String(ev.mes).padStart(2, '0')}-${String(ev.dia).padStart(2, '0')}`;
        mapa[chave] = mapa[chave] ? [...mapa[chave], ev.descricao] : [ev.descricao];
      });
      setEventos(mapa);
    };
    carregar();
  }, [ano]);

  const listaEventos = Object.entries(eventos)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .flatMap(([data, descs]) => descs.map((d) => ({ data, descricao: d })));

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
          {listaEventos.map((ev, idx) => (
            <li key={`${ev.data}-${idx}`}>
              <span className="dia-legenda">
                {new Date(ev.data).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit'
                })}
              </span>{' '}
              - {ev.descricao}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Impressao;
