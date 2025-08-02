import React from 'react';
// import Calendar from './components/Calendar';
import PrintableCalendars, { MESES } from './components/PrintableCalendars';

// Gera calendários reais para o ano atual sem eventos
const anoAtual = new Date().getFullYear();
const calendariosAno = MESES.map((mes) => ({
  mes,
  ano: anoAtual,
  eventos: [],
  fasesLua: {}
}));

function App() {
  return (
    <main>
      <h1>Calendários para Impressão</h1>
      <PrintableCalendars calendarios={calendariosAno} />
    </main>
  );
}

export default App;
