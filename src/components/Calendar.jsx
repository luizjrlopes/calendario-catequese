import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

function Calendar() {
  const [eventos, setEventos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const mes = 7; // Agosto (base 0)
  const ano = 2025;

  const carregarEventos = async () => {
    const q = query(collection(db, 'eventos'),
      where('mes', '==', mes + 1),
      where('ano', '==', ano));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setEventos(data);
  };

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
  if (semana.length > 0) semanas.push(semana);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!descricao || !diaSelecionado) return;
    await addDoc(collection(db, 'eventos'), {
      dia: diaSelecionado,
      descricao,
      mes: mes + 1,
      ano
    });
    setDescricao('');
    setDiaSelecionado(null);
    carregarEventos();
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <div className="calendario">
      <h2>Agosto 2025</h2>
      <table>
        <thead>
          <tr>
            <th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th>
          </tr>
        </thead>
        <tbody>
          {semanas.map((semana, i) => (
            <tr key={i}>
              {semana.map((dia, j) => (
                <td key={j} onClick={() => setDiaSelecionado(dia)}>
                  {dia}
                  {eventos.find(ev => ev.dia === dia) && <div className="marcado">*</div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {diaSelecionado && (
        <form onSubmit={handleAdd}>
          <h4>Adicionar evento no dia {diaSelecionado}</h4>
          <input value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
          <button type="submit">Salvar</button>
        </form>
      )}

      <ul className="eventos">
        {eventos.map((ev, idx) => (
          <li key={idx}>{ev.dia.toString().padStart(2, '0')} - {ev.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
