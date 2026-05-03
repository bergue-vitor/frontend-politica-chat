import { EllipsisVertical, History, Share2 } from 'lucide-react';

interface ChatHeaderProps {
  badgeLabel: string;
}

export function ChatHeader({ badgeLabel }: ChatHeaderProps) {
  const handleShare = async () => {
    const shareData = {
      title: 'Assistente de Políticas',
      text: 'Acesse o Assistente de Políticas.',
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <header className="chat-header">
      <div className="chat-header-main">
        <h1 className="chat-header-title">Assistente de Políticas</h1>
        <span className="chat-header-badge">{badgeLabel}</span>
      </div>

      <div className="chat-header-actions" aria-label="Ações do chat">
        <button
          type="button"
          className="chat-icon-button"
          onClick={handleShare}
          aria-label="Compartilhar chat"
          title="Compartilhar"
        >
          <Share2 size={16} />
        </button>
        <button type="button" className="chat-icon-button" aria-label="Histórico">
          <History size={16} />
        </button>
        <button type="button" className="chat-icon-button" aria-label="Mais opções">
          <EllipsisVertical size={16} />
        </button>
      </div>
    </header>
  );
}
