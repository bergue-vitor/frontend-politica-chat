import type { ReactNode } from 'react';

interface ChatEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ChatEmptyState({
  icon,
  title,
  description,
}: ChatEmptyStateProps) {
  return (
    <div className="chat-empty-state">
      <div className="chat-empty-icon" aria-hidden="true">
        {icon}
      </div>
      <h2 className="chat-empty-title">{title}</h2>
      <p className="chat-empty-description">{description}</p>
    </div>
  );
}
