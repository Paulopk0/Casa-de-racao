import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Estoque.css';

export default function Estoque() {
  const navigate = useNavigate();
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api/comida';

  const Comidas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setComidas(response.data);
    } catch (err) {
      console.error("Erro ao buscar comidas:", err);
      setError("Erro ao carregar os dados. Verifique a conexão com a API e o servidor Laravel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Comidas();
  }, []);

  const handleDeleteComida = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta comida?')) return;

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setComidas(comidas.filter((comida) => comida.id !== id));
    } catch (err) {
      console.error("Erro ao excluir comida:", err.response ? err.response.data : err.message);
      setError("Erro ao excluir a comida. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditComida = (id) => {
    navigate(`/comida/update/${id}`);
  };

  const handleCreateComida = () => {
    navigate('/comida/create');
  };

  return (
    <div className="estoque-container">
      <h1 className="estoque-title">Estoque de Comidas</h1>

      {loading && <p>Carregando dados do estoque...</p>}

      {error && (
        <div className="estoque-error">
          {error}
        </div>
      )}

      <div className="estoque-actions">
        <button className="btn-create" onClick={handleCreateComida}>
          Adicionar Nova Comida
        </button>
      </div>

      {!loading && comidas.length === 0 && !error ? (
        <p className="estoque-empty">Nenhuma comida encontrada no estoque.</p>
      ) : (
        !loading && !error && (
          <div className="estoque-table-container">
            <table className="estoque-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Marca</th>
                  <th>Preço</th>
                  <th>Validade</th>
                  <th>Tipo</th>
                  <th>Sabor</th>
                  <th>Data de Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {comidas.map((comida) => (
                  <tr key={comida.id}>
                    <td>{comida.id}</td>
                    <td>{comida.marca}</td>
                    <td>R$ {parseFloat(comida.preco).toFixed(2)}</td>
                    <td>{comida.validade}</td>
                    <td>{comida.tipo}</td>
                    <td>{comida.sabor}</td>
                    <td>{comida.dt_entrada}</td>
                    <td className="estoque-buttons">
                      <button className="btn-edit" onClick={() => handleEditComida(comida.id)}>
                        Editar
                      </button>
                      <button className="btn-delete" onClick={() => handleDeleteComida(comida.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      <Outlet />
    </div>
  );
}
