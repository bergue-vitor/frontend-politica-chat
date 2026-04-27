import type { ChatMessage } from '../types/chat.types';
import { formatTime } from '../utils/chat.helpers';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function AssistantAvatarIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" fill="#2F6EF2" />
      <rect x="13.5" y="14.5" width="13" height="11" rx="2.5" stroke="white" strokeWidth="1.9" />
      <path d="M20 11V14.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M10.8 20H13.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M26.5 20H29.2" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M16.4 28V25.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M23.6 28V25.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="17.9" cy="19.6" r="1.15" fill="white" />
      <circle cx="22.1" cy="19.6" r="1.15" fill="white" />
    </svg>
  );
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="assistant-avatar" aria-hidden="true">
          <AssistantAvatarIcon />
        </div>
      )}

      <div className="message-stack">
        <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
          <p className="message-text">{message.content}</p>
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="message-sources">
            {message.sources.map((source) => (
              <span key={source.id} className="source-chip">
                {source.title}
              </span>
            ))}
          </div>
        )}

        <span className="message-time">{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}
