import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './update.css';

const UpdateComida = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comida, setComida] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const saborRef = useRef();
  const marcaRef = useRef();
  const precoRef = useRef();
  const validadeRef = useRef();
  const tipoRef = useRef();
  const dtEntradaRef = useRef();

  const API_BASE_URL = 'http://localhost:8000/api/comida';

  useEffect(() => {
    const fetchComida = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setComida(response.data);
      } catch (err) {
        console.error("Erro ao buscar comida:", err);
        setError("Erro ao carregar os dados da comida.");
      } finally {
        setLoading(false);
      }
    };

    fetchComida();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus('');

    const dadosAtualizados = {
      sabor: saborRef.current.value,
      marca: marcaRef.current.value,
      preco: precoRef.current.value,
      validade: validadeRef.current.value,
      tipo: tipoRef.current.value,
      dt_entrada: dtEntradaRef.current.value
    };

    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, dadosAtualizados);
      setStatus('Comida atualizada com sucesso!');
      setTimeout(() => {
        navigate('/estoque');
      }, 2000);
    } catch (err) {
      console.error("Erro ao atualizar comida:", err);
      setError(`Erro ao atualizar: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p>Carregando dados da comida...</p>;
  if (!comida) return <p>Comida não encontrada.</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Editar Comida</h2>
      
      {error && <div className="form-error">{error}</div>}
      {status && <div className="form-success">{status}</div>}

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label>Sabor:</label>
          <input type="text" ref={saborRef} defaultValue={comida.sabor} required />
        </div>

        <div>
          <label>Marca:</label>
          <input type="text" ref={marcaRef} defaultValue={comida.marca} required />
        </div>

        <div className="form-row">
          <div>
            <label>Preço:</label>
            <input type="number" step="0.01" ref={precoRef} defaultValue={comida.preco} required />
          </div>

          <div>
            <label>Validade:</label>
            <input type="date" ref={validadeRef} defaultValue={comida.validade} required />
          </div>
        </div>

        <div>
          <label>Tipo:</label>
          <input type="text" ref={tipoRef} defaultValue={comida.tipo} required />
        </div>

        <div>
          <label>Data de Entrada:</label>
          <input type="date" ref={dtEntradaRef} defaultValue={comida.dt_entrada} required />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={() => navigate('/estoque')} className="btn-back">Voltar</button>
          <button type="submit" className="btn-submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComida;
