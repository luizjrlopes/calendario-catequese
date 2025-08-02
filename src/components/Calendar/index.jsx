// src/components/Calendar/index.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import * as S from './../../styles/calendar';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Função segura para extrair ano, mês, dia de uma string 'YYYY-MM-DD'
const getDataParts = (dataStr) => {
  if (!dataStr) return {};
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  return { ano, mes, dia };
};

const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  if (!ano || !mes || !dia) return 'Data inválida';
  return `${dia}/${mes}/${ano}`;
};

function Calendar() {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [dataEvento, setDataEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataModal, setDataModal] = useState(null);

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  // Carregar eventos do mês/ano atual
  const carregarEventos = async () => {
    const q = query(
      collection(db, 'eventos'),
      where('mes', '==', mes + 1),
      where('ano', '==', ano)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));
    setEventos(data);
  };

  useEffect(() => {
    carregarEventos();
  }, [mes, ano]);

  // Gerar grade de semanas/dias do mês atual
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

  // Eventos agrupados por dia do mês
  const eventosPorDia = eventos.reduce((acc, ev) => {
    acc[ev.dia] = acc[ev.dia] ? [...acc[ev.dia], ev] : [ev];
    return acc;
  }, {});

  // Agrupamento por data string para listagem
  const datasAgrupadas = eventos.reduce((acc, ev) => {
    if (!ev.data) return acc;
    acc[ev.data] = acc[ev.data] ? [...acc[ev.data], ev] : [ev];
    return acc;
  }, {});
  const datasOrdenadas = Object.keys(datasAgrupadas).sort();

  // Adicionar novo evento sem erro de fuso!
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!dataEvento || !descricao) return;   

    const { ano, mes, dia } = getDataParts(dataEvento);
    const dataPadrao = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    await addDoc(collection(db, 'eventos'), {
      data: dataPadrao,
      dia,
      mes,
      ano,
      descricao: descricao.trim()
    });
    

    setDataEvento('');
    setDescricao('');
    carregarEventos();
  };

  // Abrir modal para o dia selecionado
  const abrirModal = (dia) => {
    const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    setDataModal(data);
  };

  const fecharModal = () => setDataModal(null);

  // Remover evento
  const removerEvento = async (id) => {
    if (window.confirm('Remover evento?')) {
      await deleteDoc(doc(db, 'eventos', id));
      carregarEventos();
    }
  };

  // Editar descrição do evento
  const editarEvento = async (ev) => {
    const nova = window.prompt('Nova descrição', ev.descricao);
    if (nova && nova.trim()) {
      await updateDoc(doc(db, 'eventos', ev.id), { descricao: nova.trim() });
      carregarEventos();
    }
  };

  // Exportar CSV
  const exportarCSV = () => {
    const linhas = [
      ['data', 'descricao'],
      ...eventos.map((ev) => [ev.data, ev.descricao])
    ];
    const csv = linhas.map((l) => l.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eventos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <S.Container>
      <S.Header>
        <S.NavButton onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}>&lt;</S.NavButton>
        <h2>{MESES[mes]} {ano}</h2>
        <S.NavButton onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}>&gt;</S.NavButton>
      </S.Header>

      <S.Table>
        <thead>
          <tr>
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <th key={i}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {semanas.map((sem, i) => (
            <tr key={i}>
              {sem.map((dia, j) => (
                <td
                  key={j}
                  className={dia && eventosPorDia[dia] ? 'has-event' : ''}
                  onClick={() => dia && abrirModal(dia)}
                >
                  {dia}
                  {dia && eventosPorDia[dia] && <S.Dot />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </S.Table>

      <S.FormEvent onSubmit={handleAdd}>
        <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} required />
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
        <button type="submit">Salvar</button>
      </S.FormEvent>

      <S.Acoes>
        <button onClick={() => window.print()}>Imprimir calendário</button>
        <button onClick={exportarCSV}>Exportar CSV</button>
      </S.Acoes>

      <S.EventList>
        {datasOrdenadas.map((data) => (
          <li key={data}>
            <strong>{formatarData(data)}</strong>
            <ul>
              {datasAgrupadas[data].map((ev) => (
                <li key={ev.id}>{ev.descricao}</li>
              ))}
            </ul>
          </li>
        ))}
      </S.EventList>

      {dataModal && (
        <S.ModalOverlay onClick={fecharModal}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
          <h3>{formatarData(dataModal)}</h3>

       <ul>
  {(datasAgrupadas[dataModal] || []).map((ev) => (
    <li key={ev.id}>
      {ev.descricao}{' '}
      <button onClick={() => editarEvento(ev)}>Editar</button>{' '}
      <button onClick={() => removerEvento(ev.id)}>Remover</button>
    </li>
  ))}
</ul>

            <button onClick={fecharModal}>Fechar</button>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}

export default Calendar;
