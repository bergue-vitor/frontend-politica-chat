import type { ChatSource } from '../types/chat.types';

export const mockAssistantSources: ChatSource[] = [
  {
    id: 'policy-reimbursement-v32',
    title: 'Política de Reembolso de Despesas v3.2.pdf',
  },
];

export const mockAssistantContent =
  'A resposta é x, porque o arquivo Política de Reembolso de Despesas v3.2.pdf informa esse prazo na seção 4.1, onde está definido o período oficial para abertura da solicitação após a realização da despesa.';
