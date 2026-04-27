import { EllipsisVertical, History, SlidersHorizontal } from 'lucide-react';

interface ChatHeaderProps {
  badgeLabel: string;
}

export function ChatHeader({ badgeLabel }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header-main">
        <h1 className="chat-header-title">Assistente de Políticas</h1>
        <span className="chat-header-badge">{badgeLabel}</span>
      </div>

      <div className="chat-header-actions" aria-label="Ações do chat">
        <button type="button" className="chat-icon-button" aria-label="Histórico">
          <History size={16} />
        </button>
        <button type="button" className="chat-icon-button" aria-label="Filtros">
          <SlidersHorizontal size={16} />
        </button>
        <button type="button" className="chat-icon-button" aria-label="Mais opções">
          <EllipsisVertical size={16} />
        </button>
      </div>
    </header>
  );
}
