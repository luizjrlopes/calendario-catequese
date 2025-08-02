// Impressao.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as S from './../../styles/impressao';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
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

  const renderCalendario = (mes) => {
    const semanas = gerarSemanas(ano, mes);
    const mesNome = MESES[mes];

    const eventosDoMes = Object.entries(eventos)
      .filter(([data]) => parseInt(data.split('-')[1]) === mes + 1)
      .flatMap(([data, descricoes]) => descricoes.map((desc) => ({ data, desc })));

    return (
      <S.CalendarioImpressao key={mes}>
        <S.CabecalhoMes>
          <span>{mesNome.toUpperCase()}</span>
          <span>{ano}</span>
        </S.CabecalhoMes>
        <S.TabelaMes>
          <thead>
            <tr>
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                <th key={i} className={i === 0 ? 'domingo' : ''}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {semanas.map((sem, i) => (
              <tr key={i}>
                {sem.map((dia, j) => {
                  if (!dia) return <td key={j}></td>;
                  const key = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                  const hasEvento = !!eventos[key];
                  const isDomingo = new Date(ano, mes, dia).getDay() === 0;
                  const classes = [isDomingo || hasEvento ? 'dia-vermelho' : ''].join(' ');
                  return <td key={j} className={classes}>{dia}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </S.TabelaMes>
        <S.EventosLista>
          {eventosDoMes.map((ev, i) => (
            <li key={i}>
              <span className="data-evento">{ev.data.slice(8, 10)}</span> - {ev.desc}
            </li>
          ))}
        </S.EventosLista>
        <S.FasesLua>
          <span>◯ 01/31 CRESC</span>
          <span>◯ 09 CHEIA</span>
          <span>● 16 MING</span>
          <span>○ 23 NOVA</span>
        </S.FasesLua>
      </S.CalendarioImpressao>
    );
  };

  return (
    <S.FolhaImpressao>
      {[...Array(12).keys()].map((mes) => renderCalendario(mes))}
    </S.FolhaImpressao>
  );
}

export default Impressao;
