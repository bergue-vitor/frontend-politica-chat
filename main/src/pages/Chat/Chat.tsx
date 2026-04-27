import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import '../../styles/chat.css';

export default function Chat() {
  const [query, setQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!query.trim()) return;
    setQuery('');
  };

  return (
    <div className="dashboard-page">
      <div className="chat-inner">

        <header className="chat-topbar">
          <div className="chat-topbar-left">
            <span className="chat-topbar-title">Assistente de Políticas</span>
            <span className="chat-topbar-badge">Área do usuário</span>
          </div>
          <div className="chat-topbar-actions">
            <button className="chat-topbar-icon-btn" title="Favoritos">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </button>
            <button className="chat-topbar-icon-btn" title="Layout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button className="chat-topbar-icon-btn" title="Mais opções">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="chat-body">
          <div className="chat-empty-state">
            <div className="chat-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 className="chat-empty-title">Consulte políticas e normas</h2>
            <p className="chat-empty-subtitle">Busque diretrizes de forma inteligente</p>
          </div>
        </div>

        <div className="chat-input-wrapper">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              placeholder="Faça uma pergunta..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div className="chat-input-footer">
              <span className="chat-source-count">0 fontes</span>
              <button
                className={`chat-send-btn ${query.trim() ? 'active' : ''}`}
                onClick={handleSend}
                disabled={!query.trim()}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}