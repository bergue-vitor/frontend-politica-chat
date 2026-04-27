import { useState } from 'react';
import { MessageSquare, Search, ChevronDown, ChevronRight, Globe, Zap, FileText, Shield } from 'lucide-react';
import '../../styles/sidebar.css';

const historyItems = [
  { id: 1, title: 'Política de reembolso de vi...' },
  { id: 2, title: 'Solicitação de férias 2024' },
  { id: 3, title: 'Uso de VPN fora do país' },
];

export default function Sidebar() {
  const [intranetOpen, setIntranetOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeHistory, setActiveHistory] = useState<number | null>(null);

  return (
    <aside className="sidebar">

      {/* Topo */}
      <div className="sb-top">
        <div className="sb-logo">
          <Shield size={16} />
        </div>
        <button className="sb-icon-btn" title="Nova conversa">
          <MessageSquare size={15} />
        </button>
      </div>

      {/* Fontes da Empresa */}
      <div className="sb-section">
        <div className="sb-section-header">
          <span className="sb-section-label">Fontes da Empresa</span>
          <button className="sb-icon-btn-sm" title="Gerenciar fontes">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </button>
        </div>

        <button className="sb-item">
          <Search size={13} className="sb-item-icon muted" />
          <span>Pesquise novas fontes na intranet</span>
        </button>

        <div className="sb-group">
          <button className="sb-group-btn" onClick={() => setIntranetOpen(o => !o)}>
            <div className="sb-group-left">
              <Globe size={13} className="sb-item-icon blue" />
              <span>Intranet</span>
            </div>
            <ChevronDown size={12} className={`sb-chevron ${intranetOpen ? 'open' : ''}`} />
          </button>
        </div>

        <div className="sb-group">
          <button className="sb-group-btn" onClick={() => setSearchOpen(o => !o)}>
            <div className="sb-group-left">
              <Zap size={13} className="sb-item-icon yellow" />
              <span>Pesquisa rápida</span>
            </div>
            <div className="sb-group-right">
              <ChevronDown size={12} className={`sb-chevron ${searchOpen ? 'open' : ''}`} />
              <span className="sb-arrow-btn" onClick={e => e.stopPropagation()}>
                <ChevronRight size={12} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Histórico de Conversas */}
      <div className="sb-section">
        <div className="sb-section-header">
          <span className="sb-section-label">Histórico de Conversas</span>
        </div>
        <div className="sb-history-list">
          {historyItems.map(item => (
            <button
              key={item.id}
              className={`sb-item ${activeHistory === item.id ? 'active' : ''}`}
              onClick={() => setActiveHistory(item.id)}
            >
              <MessageSquare size={13} className="sb-item-icon muted" />
              <span className="sb-history-title">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Políticas Salvas */}
      <div className="sb-policies">
        <FileText size={22} className="sb-policies-icon" />
        <p className="sb-policies-text">As políticas salvas vão aparecer aqui.</p>
      </div>

    </aside>
  );
}