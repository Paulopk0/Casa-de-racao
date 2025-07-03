import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [id, setId] = useState('');
  const [comida, setComida] = useState(null);
  const [erro, setErro] = useState(null);

  const buscarComidaPorId = async () => {
    if (!id.trim()) {
      setErro('Por favor, informe um ID.');
      setComida(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/comida/${id}`);
      setComida(response.data);
      setErro(null);
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao buscar a comida.');
      setComida(null);
    }
  };

  return (
    <div className="buscar-comida-container">
      <h2>Buscar Comida por ID</h2>

      <div className="buscar-form">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID da comida"
        />
        
        <button onClick={buscarComidaPorId}>Buscar</button>
      </div>

      {erro && <div className="buscar-erro">{erro}</div>}

      {comida && (
        <div className="buscar-resultado">
          <h3>Resultado:</h3>
          <ul>
            <li><strong>ID:</strong> {comida.id}</li>
            <li><strong>Marca:</strong> {comida.marca}</li>
            <li><strong>Preço:</strong> R$ {parseFloat(comida.preco).toFixed(2)}</li>
            <li><strong>Validade:</strong> {comida.validade}</li>
            <li><strong>Tipo:</strong> {comida.tipo}</li>
            <li><strong>Sabor:</strong> {comida.sabor}</li>
            <li><strong>Data de Entrada:</strong> {comida.dt_entrada}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
