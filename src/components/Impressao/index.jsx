import React, { useEffect, useState } from "react";
import * as S from './../../styles/impressao';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Moon } from "lunarphase-js";
const simbolos = {
  NOVA: "🌑",
  CRESC: "🌓",
  CHEIA: "🌕",
  MING: "🌗",
};
const MESES = [
  "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
  "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];
const DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];

// pega as quatro fases principais de um dado mês/ano
function fasesDoMes(ano, mes) {

  const desejadas = ["CRESC", "CHEIA", "MING", "NOVA"]; // ordem de exibição
  const encontradas = {};

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  for (let d = 1; d <= diasNoMes; d++) {
    const data = new Date(ano, mes, d);
    const faseRaw = Moon.lunarPhase(data); // ex: "New", "First Quarter", "Full", "Last Quarter"

    let nomeInterno = null;
    if (faseRaw === "First Quarter") nomeInterno = "CRESC";
    else if (faseRaw === "Full") nomeInterno = "CHEIA";
    else if (faseRaw === "Last Quarter") nomeInterno = "MING";
    else if (faseRaw === "New") nomeInterno = "NOVA";

    if (nomeInterno && !encontradas[nomeInterno]) {
      encontradas[nomeInterno] = {
        nome: nomeInterno,
        simbolo: simbolos[nomeInterno],
        dia: String(d).padStart(2, "0"),
      };
    }

    if (Object.keys(encontradas).length === 4) break;
  }

  return desejadas.map((n) => encontradas[n]).filter(Boolean);
}

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
      const q = query(collection(db, "eventos"), where("ano", "==", ano));
      const snapshot = await getDocs(q);
      const mapa = {};
      snapshot.forEach((d) => {
        const ev = d.data();
        if (!mapa[ev.mes]) mapa[ev.mes] = {};
        if (!mapa[ev.mes][ev.dia]) mapa[ev.mes][ev.dia] = [];
        mapa[ev.mes][ev.dia].push(ev);
      });
      setEventos(mapa);
    };
    carregar();
  }, [ano]);

  const eventosLegenda = (mes) => {
    if (!eventos[mes + 1]) return [];
    const arr = [];
    Object.keys(eventos[mes + 1])
      .sort((a, b) => Number(a) - Number(b))
      .forEach((dia) => {
        eventos[mes + 1][dia].forEach(ev => {
          arr.push({ dia, desc: ev.descricao });
        });
      });
    return arr;
  };

  const MES_POR_PAG = 3;
  const gruposMeses = [];
  for (let i = 0; i < 12; i += MES_POR_PAG) {
    gruposMeses.push([i, i + 1, i + 2].filter((m) => m < 12));
  }

  return (
    <S.Folha>
      {gruposMeses.map((grupo, gi) => (
        <S.LinhaCalendarios key={gi}>
          {grupo.map((mes) => (
            <S.CalendarCard key={mes}>
              <S.Header>
                <span>{MESES[mes]}</span>
                <span className="year">{ano}</span>
              </S.Header>
              <S.CalendarTable>
                <thead>
                  <tr>
                    {DIAS.map((d, i) => (
                      <S.Th key={d} domingo={i === 0}>{d}</S.Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gerarSemanas(ano, mes).map((sem, i) => (
                    <tr key={i}>
                      {sem.map((dia, j) => {
                        const dom = j === 0;
                        const isEvento = dia && eventos[mes + 1] && eventos[mes + 1][dia];
                        return (
                          <S.Td key={j} domingo={dom} evento={!!isEvento}>
                            {dia && (
                              <span className={dom ? "vermelho" : ""}>
                                <b>{dia}</b>
                              </span>
                            )}
                          </S.Td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </S.CalendarTable>

              <S.Legenda>
                <ul>
                  {eventosLegenda(mes).map((ev, i) => (
                    <li key={i}>
                      <span className="event-date">
                        {String(ev.dia).padStart(2, "0")}/{String(mes + 1).padStart(2, "0")}
                      </span>
                      {" – "}{ev.desc}
                    </li>
                  ))}
                </ul>
              </S.Legenda>

              <S.Footer>
  {fasesDoMes(ano, mes).map((f, i) => (
    <span key={i} className="fase">
      <span >{simbolos[f.nome]}</span>
      {f.dia} {f.nome}
    </span>
  ))}
</S.Footer>
            </S.CalendarCard>
          ))}
        </S.LinhaCalendarios>
      ))}
    </S.Folha>
  );
}

export default Impressao;
