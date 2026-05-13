import { ArrowRight, Building2, MonitorCog } from 'lucide-react';
import type { KeyboardEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending?: boolean;
  sourcesCount?: number;
  selectedDepartments?: string[];
  departments: string[];
  onDepartmentsChange: (departments: string[]) => void;
  selectedSystems?: string[];
  systems: string[];
  onSystemsChange: (systems: string[]) => void;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isSending = false,
  sourcesCount = 0,
  selectedDepartments = ['Todos os departamentos'],
  departments,
  onDepartmentsChange,
  selectedSystems = ['Todos os sistemas'],
  systems,
  onSystemsChange,
}: ChatInputProps) {
  const departmentSummary = getSelectionSummary(selectedDepartments, departments[0]);
  const systemSummary = getSelectionSummary(selectedSystems, systems[0]);
  const activeFilters = [
    ...selectedDepartments.filter((department) => department !== departments[0]),
    ...selectedSystems.filter((system) => system !== systems[0]),
  ];
  const placeholderTarget = activeFilters.join(' / ');

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  function handleDepartmentChange(department: string) {
    onDepartmentsChange(getNextSelection(selectedDepartments, department, departments[0]));
  }

  function handleSystemChange(system: string) {
    onSystemsChange(getNextSelection(selectedSystems, system, systems[0]));
  }

  return (
    <div className="chat-input-shell">
      <div className="chat-input-wrapper">
        <details className="chat-filter-menu">
          <summary className="chat-department-filter" title="Limitar respostas por departamento">
            <Building2 size={15} />
            <span>{departmentSummary}</span>
          </summary>

          <div className="chat-filter-options">
            {departments.map((department) => (
              <label className="chat-filter-option" key={department}>
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(department)}
                  onChange={() => handleDepartmentChange(department)}
                />
                <span>{department}</span>
              </label>
            ))}
          </div>
        </details>

        <details className="chat-filter-menu">
          <summary className="chat-department-filter" title="Limitar respostas por sistema">
            <MonitorCog size={15} />
            <span>{systemSummary}</span>
          </summary>

          <div className="chat-filter-options">
            {systems.map((system) => (
              <label className="chat-filter-option" key={system}>
                <input
                  type="checkbox"
                  checked={selectedSystems.includes(system)}
                  onChange={() => handleSystemChange(system)}
                />
                <span>{system}</span>
              </label>
            ))}
          </div>
        </details>

        <textarea
          className="chat-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            activeFilters.length === 0
              ? 'Faça uma pergunta...'
              : `Faça uma pergunta sobre ${placeholderTarget}...`
          }
          rows={1}
        />

        <div className="chat-input-actions">
          <span className="chat-sources-counter">
            {departmentSummary} · {systemSummary} · {sourcesCount} fontes
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

function getNextSelection(currentSelection: string[], selectedOption: string, allOption: string) {
  if (selectedOption === allOption) {
    return [allOption];
  }

  const withoutAllOption = currentSelection.filter((option) => option !== allOption);
  const nextSelection = withoutAllOption.includes(selectedOption)
    ? withoutAllOption.filter((option) => option !== selectedOption)
    : [...withoutAllOption, selectedOption];

  return nextSelection.length > 0 ? nextSelection : [allOption];
}

function getSelectionSummary(selection: string[], allOption: string) {
  const selectedItems = selection.filter((option) => option !== allOption);

  if (selectedItems.length === 0) {
    return allOption;
  }

  if (selectedItems.length <= 2) {
    return selectedItems.join(', ');
  }

  return `${selectedItems.length} selecionados`;
}
