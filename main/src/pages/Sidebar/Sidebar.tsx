import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FileText,
  Grid2X2,
  History,
  KeyRound,
  Layers3,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  ShieldCheck,
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
  const location = useLocation();
  const isAdmin = user.role === '2';
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    function handleViewportChange() {
      setIsMobile(mediaQuery.matches);
      setIsCollapsed(mediaQuery.matches);
    }

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile, location.pathname]);

  const sidebarClassName = [
    'sidebar',
    isCollapsed ? 'collapsed' : '',
    isMobile ? 'mobile' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <aside
        className={sidebarClassName}
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
            {isCollapsed ? (
              <PanelLeftOpen size={19} strokeWidth={1.8} />
            ) : (
              <PanelLeftClose size={19} strokeWidth={1.8} />
            )}
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

              <NavLink to="/admin/departments" className="sidebar-admin-link">
                <Layers3 size={17} strokeWidth={1.8} />
                Departamentos
              </NavLink>

              <NavLink to="/admin/systems" className="sidebar-admin-link">
                <Layers3 size={17} strokeWidth={1.8} />
                Sistemas
              </NavLink>

              <NavLink to="/admin/tokens" className="sidebar-admin-link">
                <KeyRound size={17} strokeWidth={1.8} />
                Gerenciamento de Tokens
              </NavLink>

              <NavLink to="/document-timeline" className="sidebar-admin-link">
                <History size={17} strokeWidth={1.8} />
                Timeline de Documentos
              </NavLink>
            </nav>
          </section>
        )}

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

      {isMobile && !isCollapsed && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Fechar sidebar"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
