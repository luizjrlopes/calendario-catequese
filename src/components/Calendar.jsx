//calendario.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
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

function Calendar() {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [dataEvento, setDataEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataModal, setDataModal] = useState(null);

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const carregarEventos = async () => {
    const q = query(
      collection(db, 'eventos'),
      where('mes', '==', mes + 1),
      where('ano', '==', ano)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setEventos(data);
  };

  useEffect(() => {
    carregarEventos();
  }, [mes, ano]);

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

  const eventosPorDia = eventos.reduce((acc, ev) => {
    acc[ev.dia] = acc[ev.dia] ? [...acc[ev.dia], ev] : [ev];
    return acc;
  }, {});

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!dataEvento || !descricao) return;
    const d = new Date(dataEvento);
    await addDoc(collection(db, 'eventos'), {
      data: dataEvento,
      dia: d.getDate(),
      mes: d.getMonth() + 1,
      ano: d.getFullYear(),
      descricao
    });
    setDataEvento('');
    setDescricao('');
    carregarEventos();
  };

  const abrirModal = (dia) => {
    const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    setDataModal(data);
  };

  const fecharModal = () => setDataModal(null);

  const removerEvento = async (id) => {
    if (window.confirm('Remover evento?')) {
      await deleteDoc(doc(db, 'eventos', id));
      carregarEventos();
    }
  };

  const editarEvento = async (ev) => {
    const nova = window.prompt('Nova descrição', ev.descricao);
    if (nova && nova.trim()) {
      await updateDoc(doc(db, 'eventos', ev.id), { descricao: nova.trim() });
      carregarEventos();
    }
  };

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

  const datasAgrupadas = eventos.reduce((acc, ev) => {
    acc[ev.data] = acc[ev.data] ? [...acc[ev.data], ev] : [ev];
    return acc;
  }, {});
  const datasOrdenadas = Object.keys(datasAgrupadas).sort();

  return (
    <div className="calendario">
      <div className="header">
        <button onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}>&lt;</button>
        <h2>
          {MESES[mes]} {ano}
        </h2>
        <button onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}>&gt;</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>D</th>
            <th>S</th>
            <th>T</th>
            <th>Q</th>
            <th>Q</th>
            <th>S</th>
            <th>S</th>
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
                  {dia && eventosPorDia[dia] && <span className="dot" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAdd} className="form-event">
        <input
          type="date"
          value={dataEvento}
          onChange={(e) => setDataEvento(e.target.value)}
          required
        />
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          required
        />
        <button type="submit">Salvar</button>
      </form>

      <div className="acoes">
        <button onClick={() => window.print()}>Imprimir calendário</button>
        <button onClick={exportarCSV}>Exportar CSV</button>
      </div>

      <ul className="eventos">
        {datasOrdenadas.map((data) => (
          <li key={data}>
            <strong>{new Date(data).toLocaleDateString('pt-BR')}</strong>
            <ul>
              {datasAgrupadas[data].map((ev) => (
                <li key={ev.id}>{ev.descricao}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {dataModal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{new Date(dataModal).toLocaleDateString('pt-BR')}</h3>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
