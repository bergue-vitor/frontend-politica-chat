import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Chat.css';
import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { ChatWelcome } from './components/ChatWelcome';
import { useChat } from './hooks/useChat';

export default function Chat() {
  const { user } = useAuth();
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isSending,
  } = useChat();

  const hasMessages = messages.length > 0;
  const isAdmin = user.role === '2';
  const latestAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.sender === 'assistant');
  const sourcesCount = latestAssistantMessage?.sources?.length ?? 0;

  return (
    <main className={`chat-page ${isAdmin ? 'admin' : 'user'}`}>
      <section className="chat-main">
        <ChatHeader badgeLabel={isAdmin ? 'Área administrativa' : 'Área do usuário'} />

        <div className="chat-content">
          {hasMessages ? (
            <ChatMessages messages={messages} />
          ) : (
            <ChatWelcome />
          )}
        </div>

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          isSending={isSending}
          sourcesCount={sourcesCount}
        />
      </section>
    </main>
  );
}
