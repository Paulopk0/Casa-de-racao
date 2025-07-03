import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './create.css';

const CreateComida = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const saborRef = useRef();
  const marcaRef = useRef();
  const precoRef = useRef();
  const validadeRef = useRef();
  const tipoRef = useRef();
  const dtEntradaRef = useRef();

  const API_BASE_URL = 'http://localhost:8000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);

    const novaComida = {
      sabor: saborRef.current.value,
      marca: marcaRef.current.value,
      preco: parseFloat(precoRef.current.value),
      validade: validadeRef.current.value,
      tipo: tipoRef.current.value,
      dt_entrada: dtEntradaRef.current.value
    };

    try {
      await axios.post(`${API_BASE_URL}/comida`, novaComida);
      setStatus('Comida criada com sucesso!');
      setTimeout(() => {
        navigate('/estoque');
      }, 1500);
    } catch (err) {
      console.error("Erro ao criar comida:", err);
      setError(`Erro: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cadastrar Nova Comida</h2>
      
      {error && <div className="form-error">{error}</div>}
      {status && <div className="form-success">{status}</div>}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group span-2">
          <label>Sabor:</label>
          <input type="text" ref={saborRef} required placeholder="Digite o sabor" />
        </div>

        <div className="form-group">
          <label>Marca:</label>
          <input type="text" ref={marcaRef} required placeholder="Digite a marca" />
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <input type="text" ref={tipoRef} required placeholder="Digite o tipo" />
        </div>

        <div className="form-group">
          <label>Preço:</label>
          <input type="number" step="0.01" min="0" ref={precoRef} required placeholder="Digite o preço" />
        </div>

        <div className="form-group">
          <label>Validade:</label>
          <input type="date" ref={validadeRef} required />
        </div>

        <div className="form-group">
          <label>Data de Entrada:</label>
          <input type="date" ref={dtEntradaRef} required />
        </div>

        <div className="form-actions span-2">
          <button type="button" className="btn-secondary" onClick={() => navigate('/estoque')}>
            Voltar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Confirmar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComida;
