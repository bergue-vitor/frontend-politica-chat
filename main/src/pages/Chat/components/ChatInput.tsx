import { ArrowRight, Building2 } from 'lucide-react';
import type { KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending?: boolean;
  sourcesCount?: number;
  selectedDepartment?: string;
  departments: string[];
  onDepartmentChange: (department: string) => void;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isSending = false,
  sourcesCount = 0,
  selectedDepartment = 'Todos os departamentos',
  departments,
  onDepartmentChange,
}: ChatInputProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <div className="chat-input-shell">
      <div className="chat-input-wrapper">
        <label className="chat-department-filter">
          <Building2 size={15} />
          <select
            value={selectedDepartment}
            onChange={(event) => onDepartmentChange(event.target.value)}
            aria-label="Limitar respostas ao departamento"
            title="Limitar respostas ao departamento"
          >
            {departments.map((department) => (
              <option value={department} key={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        <textarea
          className="chat-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedDepartment === 'Todos os departamentos'
              ? 'Faça uma pergunta...'
              : `Faça uma pergunta sobre ${selectedDepartment}...`
          }
          rows={1}
        />

        <div className="chat-input-actions">
          <span className="chat-sources-counter">
            {selectedDepartment} · {sourcesCount} fontes
          </span>

          <button
            type="button"
            className="chat-send-button"
            onClick={onSend}
            disabled={isSending || !value.trim()}
            aria-label={isSending ? 'Enviando mensagem' : 'Enviar mensagem'}
          >
            <ArrowRight size={18} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
