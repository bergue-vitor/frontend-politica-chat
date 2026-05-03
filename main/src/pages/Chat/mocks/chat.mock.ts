import type { ChatSource } from '../types/chat.types';

export const chatDepartments = [
  'Todos os departamentos',
  'Governança / RH',
  'Tecnologia (TI)',
  'Recursos Humanos',
  'Financeiro',
];

const departmentKnowledge: Record<string, { content: string; sources: ChatSource[] }> = {
  'Governança / RH': {
    content:
      'Resposta filtrada para Governança / RH: a orientação deve seguir a política corporativa vigente e os fluxos de aprovação definidos pelo comitê interno. A recomendação considera apenas documentos associados a governança, conformidade e rotinas de RH.',
    sources: [
      {
        id: 'governance-hr-policy',
        title: 'Manual de Governança e RH.pdf',
      },
    ],
  },
  'Tecnologia (TI)': {
    content:
      'Resposta filtrada para Tecnologia (TI): a solicitação deve observar as normas de segurança, acesso, VPN, gestão de credenciais e uso de sistemas internos. A resposta prioriza documentos técnicos e políticas operacionais de TI.',
    sources: [
      {
        id: 'it-security-policy',
        title: 'Política de Segurança da Informação.pdf',
      },
    ],
  },
  'Recursos Humanos': {
    content:
      'Resposta filtrada para Recursos Humanos: a orientação considera normas de férias, benefícios, jornada, reembolso relacionado a colaboradores e procedimentos de atendimento interno do RH.',
    sources: [
      {
        id: 'hr-benefits-policy',
        title: 'Política de Benefícios e Jornada.pdf',
      },
    ],
  },
  Financeiro: {
    content:
      'Resposta filtrada para Financeiro: a orientação considera regras de reembolso, prestação de contas, centros de custo, aprovações financeiras e auditoria de despesas.',
    sources: [
      {
        id: 'finance-reimbursement-policy',
        title: 'Política de Reembolso de Despesas v3.2.pdf',
      },
    ],
  },
};

const defaultKnowledge = {
  content:
    'Resposta considerando todos os departamentos: a orientação usa a base geral de políticas internas e pode combinar normas de RH, Financeiro, TI e Governança quando a pergunta envolver mais de uma área.',
  sources: [
    {
      id: 'general-policy-index',
      title: 'Índice Geral de Políticas Internas.pdf',
    },
  ],
};

export function getMockAssistantResponse(department: string) {
  return departmentKnowledge[department] ?? defaultKnowledge;
}
