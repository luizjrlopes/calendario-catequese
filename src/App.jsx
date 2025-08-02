// App.jsx
import React from 'react';
import Calendar from './components/Calendar';
import Impressao from './components/Impressao';
import { GlobalStyle } from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/calendario-catequese/"
          element={
            <main>
              <h1>Calendário Catequese</h1>
              <Calendar />
            </main>
          }
        />
        <Route
          path="calendario-catequese/impressao"
          element={<Impressao />}
        />
      </Routes>
    </Router>
  );
}

export default App;
