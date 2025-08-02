import React from 'react';
import Calendar from './components/Calendar';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <main>
      <h1>Calendário Catequese</h1>
      <Calendar />
      <GlobalStyle />
    </main>
  );
}

export default App;
