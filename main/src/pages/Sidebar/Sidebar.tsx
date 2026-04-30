import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  ChevronDown,
  FileText,
  Globe2,
  Grid2X2,
  History,
  Layers3,
  MessageSquare,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  UserCog,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/sidebar.css';

const conversationHistory = [
  'Política de reembolso de vi...',
  'Solicitação de férias 2024',
  'Uso de VPN fora do país',
];

export default function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user.role === '2';
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      aria-label="Navegação principal"
    >
      <div className="sidebar-top-icons">
        <NavLink to="/chat" className="sidebar-brand" aria-label="Ir para o chat">
          <ShieldCheck size={20} strokeWidth={1.8} />
        </NavLink>

        <button
          type="button"
          className="sidebar-chat-icon"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label={isCollapsed ? 'Abrir sidebar' : 'Fechar sidebar'}
          aria-expanded={!isCollapsed}
        >
          <MessageSquare size={19} strokeWidth={1.8} />
        </button>
      </div>

      <div className="sidebar-content" aria-hidden={isCollapsed}>
        <div className="sidebar-divider" />

        <section className="sidebar-section sidebar-sources">
          <NavLink
            to={isAdmin ? '/admin/documents' : '/chat'}
            className="sidebar-section-header sidebar-section-header-link"
            aria-label={isAdmin ? 'Ir para políticas e normas' : 'Fontes da empresa'}
          >
            <h2>Fontes da Empresa</h2>
            <Grid2X2 size={17} strokeWidth={1.8} />
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin/documents" className="sidebar-add-source">
              <span aria-hidden="true">+</span>
              Adicionar políticas/normas
            </NavLink>
          )}
        </section>

        {isAdmin && (
          <section className="sidebar-admin-panel" aria-label="Administração">
            <p className="sidebar-kicker">Administração</p>

            <nav className="sidebar-admin-nav">
              <NavLink to="/admin/documents" className="sidebar-admin-link">
                <FileText size={17} strokeWidth={1.8} />
                Gestão de Documentos
              </NavLink>

              <NavLink to="/admin/users" className="sidebar-admin-link">
                <UserCog size={17} strokeWidth={1.8} />
                Gerenciamento de Usuários
              </NavLink>

              <NavLink to="/admin/catalogs" className="sidebar-admin-link">
                <Layers3 size={17} strokeWidth={1.8} />
                Departamentos e Sistemas
              </NavLink>

              <NavLink to="/document-timeline" className="sidebar-admin-link">
                <History size={17} strokeWidth={1.8} />
                Timeline de Documentos
              </NavLink>
            </nav>

            <SourceSearch />
          </section>
        )}

        {!isAdmin && <SourceSearch />}

        <section className="sidebar-history" aria-label="Histórico de conversas">
          <p className="sidebar-kicker">Histórico de Conversas</p>

          <nav className="sidebar-history-list">
            {conversationHistory.slice(0, isAdmin ? 1 : 3).map((item) => (
              <NavLink to="/chat" className="sidebar-history-link" key={item}>
                <MessageSquare size={17} strokeWidth={1.8} />
                <span>{item}</span>
              </NavLink>
            ))}
          </nav>
        </section>

        <div className="sidebar-saved-empty">
          <div className="sidebar-saved-icon">
            <FileText size={23} strokeWidth={1.8} />
          </div>
          <p>As políticas salvas vão aparecer aqui.</p>
        </div>

        <section className="sidebar-profile-card" aria-label="Perfil do usuário">
          <div className="sidebar-profile-info">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>

          <NavLink to="/profile/edit" className="sidebar-profile-link">
            <Pencil size={15} strokeWidth={1.8} />
            Editar perfil
          </NavLink>
        </section>
      </div>
    </aside>
  );
}

function SourceSearch() {
  return (
    <section className="sidebar-search-card" aria-label="Pesquisar fontes">
      <label className="sidebar-search-field">
        <Search size={17} strokeWidth={1.8} />
        <span>Pesquise novas fontes na intranet</span>
      </label>

      <div className="sidebar-search-actions">
        <button type="button" className="sidebar-filter-button">
          <Globe2 size={15} strokeWidth={1.8} />
          Intranet
          <ChevronDown size={14} strokeWidth={1.8} />
        </button>

        <button type="button" className="sidebar-filter-button">
          <Sparkles size={15} strokeWidth={1.8} />
          Pesquisa rápida
          <ChevronDown size={14} strokeWidth={1.8} />
        </button>

        <button type="button" className="sidebar-go-button" aria-label="Pesquisar">
          <ArrowRight size={16} strokeWidth={1.9} />
        </button>
      </div>

      <Bot className="sidebar-search-watermark" size={20} strokeWidth={1.6} />
    </section>
  );
}
