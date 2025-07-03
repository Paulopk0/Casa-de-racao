import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.scss';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1 className="layout-logo" onClick={() => navigate('/home')}>
          Sistema de Estoque
        </h1>
        <nav className="layout-nav">
          <button onClick={() => navigate('/estoque')}>Estoque</button>
        </nav>
      </header>

      <main className="layout-main">
        <aside className="layout-aside"></aside>
        <section className="layout-content">
          <Outlet />
        </section>
        <aside className="layout-aside"></aside>
      </main>

      <footer className="layout-footer">
        <p>&copy; 2025 - Desenvolvido para controle de estoque</p>
      </footer>
    </div>
  );
}
