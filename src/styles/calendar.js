// src/components/Calendar/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 860px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #1e1e2f;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(211, 0, 0, 0.3);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #fff;
  }
`;

export const NavButton = styled.button`
  background-color: #d30000;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b20000;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: #2b2b3d;
  border-radius: 8px;
  overflow: hidden;

  th, td {
    width: 14.2%;
    height: 60px;
    text-align: center;
    vertical-align: top;
    border: 1px solid #3a3a50;
    font-weight: bold;
    font-size: 16px;
    color: #f0f0f0;
    position: relative;
  }

  th {
    background-color: #44445a;
    font-weight: normal;
  }

  td.has-event {
    background-color: #3c3c55;
    cursor: pointer;
  }
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: #d30000;
  border-radius: 50%;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
`;

export const FormEvent = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;

  input, button {
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
  }

  input[type="date"] {
    max-width: 130px;
  }

  input[type="text"] {
    flex-grow: 1;
  }

  button {
    background: #d30000;
    color: #fff;
    cursor: pointer;
  }
`;

export const Acoes = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;

  button {
    padding: 8px 12px;
    background: #444;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #666;
    }
  }
`;

export const EventList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9rem;

  li {
    margin-bottom: 0.5rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background: #1e1e2f;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  color: white;

  h3 {
    margin-bottom: 10px;
  }

  button {
    margin-top: 10px;
    background: #d30000;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  ul {
    margin-bottom: 10px;
  }
`;

export const OcultaImpressao = styled.div`
  @media print {
    display: none !important;
  }
`;
