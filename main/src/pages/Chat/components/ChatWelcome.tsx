import { ShieldCheck } from 'lucide-react';
import { ChatEmptyState } from './ChatEmptyState';

export function ChatWelcome() {
  return (
    <ChatEmptyState
      icon={<ShieldCheck size={22} strokeWidth={2.1} />}
      title="Consulte políticas e normas"
      description="Busque diretrizes de forma inteligente"
    />
  );
}
