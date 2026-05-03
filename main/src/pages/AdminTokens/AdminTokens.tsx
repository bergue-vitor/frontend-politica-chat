import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  Coins,
  Database,
  FileText,
  MoreVertical,
  Plus,
  RefreshCcw,
  Search,
  TrendingUp,
  Zap,
} from 'lucide-react';
import '../../styles/admin-users.css';
import '../../styles/admin-tokens.css';

type ConsumptionRecord = {
  id: number;
  user: string;
  email: string;
  department: string;
  type: string;
  tokens: number;
  date: string;
  dateValue: string;
  status: 'Concluído' | 'Pendente';
};

type TokenSortOrder = 'default' | 'tokens-desc' | 'tokens-asc' | 'date-desc' | 'date-asc';

const consumptionRecords: ConsumptionRecord[] = [
  {
    id: 1,
    user: 'Carla Mendes',
    email: 'carla.mendes@empresa.com',
    department: 'Governança / RH',
    type: 'Consulta de política',
    tokens: 186400,
    date: '10 Out 2026',
    dateValue: '2026-10-10',
    status: 'Concluído',
  },
  {
    id: 2,
    user: 'João Pereira',
    email: 'joao.pereira@empresa.com',
    department: 'Tecnologia (TI)',
    type: 'Resumo de documento',
    tokens: 152800,
    date: '10 Out 2026',
    dateValue: '2026-10-10',
    status: 'Concluído',
  },
  {
    id: 3,
    user: 'Ana Souza',
    email: 'ana.souza@empresa.com',
    department: 'Recursos Humanos',
    type: 'Análise normativa',
    tokens: 96500,
    date: '09 Out 2026',
    dateValue: '2026-10-09',
    status: 'Pendente',
  },
  {
    id: 4,
    user: 'Rafael Lima',
    email: 'rafael.lima@empresa.com',
    department: 'Financeiro',
    type: 'Busca em documentos',
    tokens: 84200,
    date: '09 Out 2026',
    dateValue: '2026-10-09',
    status: 'Concluído',
  },
];

const totalTokens = 10000000;
const usedTokens = 6450000;

function formatTokens(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export default function AdminTokens() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [tokenSortOrder, setTokenSortOrder] = useState<TokenSortOrder>('default');
  const [periodFilter, setPeriodFilter] = useState('15 dias');
  const [customPeriod, setCustomPeriod] = useState({ start: '', end: '' });
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('');

  const remainingTokens = totalTokens - usedTokens;
  const usagePercent = (usedTokens / totalTokens) * 100;
  const departments = ['Todos', ...new Set(consumptionRecords.map((record) => record.department))];
  const dailyAverage = Math.round(usedTokens / 15);
  const topDepartment = useMemo(() => {
    const usageByDepartment = consumptionRecords.reduce<Record<string, number>>((acc, record) => {
      acc[record.department] = (acc[record.department] ?? 0) + record.tokens;
      return acc;
    }, {});

    return Object.entries(usageByDepartment).sort((first, second) => second[1] - first[1])[0]?.[0] ?? 'Sem dados';
  }, []);
  const estimatedDaysLeft = Math.max(1, Math.floor(remainingTokens / dailyAverage));

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 450);

    return () => window.clearTimeout(loadingTimer);
  }, []);

  const filteredRecords = useMemo(() => {
    const latestRecordDate = Math.max(...consumptionRecords.map((record) => new Date(record.dateValue).getTime()));
    const periodStartDate = new Date(latestRecordDate);

    if (periodFilter === '7 dias') {
      periodStartDate.setDate(periodStartDate.getDate() - 6);
    } else if (periodFilter === '15 dias') {
      periodStartDate.setDate(periodStartDate.getDate() - 14);
    } else if (periodFilter === '30 dias') {
      periodStartDate.setDate(periodStartDate.getDate() - 29);
    }

    return consumptionRecords
      .filter((record) => {
        const searchValue = search.toLowerCase();
        const recordDate = new Date(record.dateValue);
        const matchesSearch =
          record.user.toLowerCase().includes(searchValue) ||
          record.email.toLowerCase().includes(searchValue) ||
          record.type.toLowerCase().includes(searchValue) ||
          record.department.toLowerCase().includes(searchValue);
        const matchesStatus = statusFilter === 'Todos' || record.status === statusFilter;
        const matchesDepartment = departmentFilter === 'Todos' || record.department === departmentFilter;
        const matchesPeriod =
          periodFilter === 'personalizado'
            ? (!customPeriod.start || recordDate >= new Date(customPeriod.start)) &&
              (!customPeriod.end || recordDate <= new Date(customPeriod.end))
            : recordDate >= periodStartDate;

        return matchesSearch && matchesStatus && matchesDepartment && matchesPeriod;
      })
      .sort((firstRecord, secondRecord) => {
        if (tokenSortOrder === 'default' || tokenSortOrder === 'tokens-desc') {
          return secondRecord.tokens - firstRecord.tokens;
        }

        if (tokenSortOrder === 'tokens-asc') {
          return firstRecord.tokens - secondRecord.tokens;
        }

        const firstDate = new Date(firstRecord.dateValue).getTime();
        const secondDate = new Date(secondRecord.dateValue).getTime();

        return tokenSortOrder === 'date-desc' ? secondDate - firstDate : firstDate - secondDate;
      });
  }, [search, statusFilter, departmentFilter, tokenSortOrder, periodFilter, customPeriod]);

  function closeAddModal() {
    setIsAddModalOpen(false);
    setTokenAmount('');
  }

  function handleAddTokens(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    closeAddModal();
  }

  return (
    <main className="admin-users-page admin-tokens-page">
      <section className="admin-users-content tokens-content">
        <header className="admin-users-header tokens-header">
          <div>
            <h1>Gerenciamento de Tokens</h1>
            <p>Monitore e gerencie o consumo de IA em toda a plataforma.</p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="token-action-btn token-action-btn-danger"
              onClick={() => setIsResetModalOpen(true)}
            >
              <RefreshCcw size={15} />
              Redefinir Limite
            </button>
            <button
              type="button"
              className="primary-btn token-primary-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              Adicionar Tokens
            </button>
          </div>
        </header>

        <section className="tokens-stats-grid" aria-label="Resumo de tokens">
          <article className="token-stat-card">
            <div>
              <span className="token-stat-label">Tokens Disponíveis (Mês)</span>
              <strong className="token-stat-value">{formatTokens(totalTokens)}</strong>
              <span className="token-stat-note">Limite máximo configurado na franquia</span>
              <span className="token-stat-micro">
                <CalendarDays size={12} />
                Próxima renovação: 01 Nov 2026
              </span>
            </div>
            <span className="token-stat-icon token-stat-icon-blue">
              <Database size={17} />
            </span>
          </article>

          <article className="token-stat-card">
            <div>
              <span className="token-stat-label">Tokens Utilizados</span>
              <strong className="token-stat-value">{formatTokens(usedTokens)}</strong>
              <span className="token-stat-note token-stat-warning">
                <TrendingUp size={13} />
                {usagePercent.toFixed(1)}% do limite mensal consumido
              </span>
              <span className="token-stat-micro">Média diária: {formatTokens(dailyAverage)} tokens</span>
              <span className="token-stat-micro">Maior uso no mês: {topDepartment}</span>
            </div>
            <span className="token-stat-icon token-stat-icon-yellow">
              <Zap size={17} />
            </span>
          </article>

          <article className="token-stat-card">
            <div>
              <span className="token-stat-label">Tokens Restantes</span>
              <strong className="token-stat-value">{formatTokens(remainingTokens)}</strong>
              <span className="token-stat-note token-stat-success">
                <Coins size={13} />
                Suficiente para ~15 dias de uso
              </span>
              <span className="token-stat-micro">
                Esgotamento estimado: {estimatedDaysLeft} dias
              </span>
            </div>
            <span className="token-stat-icon token-stat-icon-green">
              <Coins size={17} />
            </span>
          </article>
        </section>

        <section className="token-details-section">
          <div className="token-section-header token-details-header">
            <h2>Detalhamento de Consumo</h2>
            <div className="token-table-controls">
              <label className="token-search">
                <Search size={17} />
                <input
                  type="text"
                  placeholder="Buscar por usuário, tipo ou departamento..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <select
                className="token-filter-select"
                value={periodFilter}
                onChange={(event) => setPeriodFilter(event.target.value)}
                aria-label="Filtrar por período"
              >
                <option value="7 dias">7 dias</option>
                <option value="15 dias">15 dias</option>
                <option value="30 dias">30 dias</option>
                <option value="personalizado">Personalizado</option>
              </select>

              {periodFilter === 'personalizado' && (
                <div className="token-custom-period">
                  <input
                    type="date"
                    value={customPeriod.start}
                    onChange={(event) => setCustomPeriod((current) => ({ ...current, start: event.target.value }))}
                    aria-label="Data inicial"
                  />
                  <input
                    type="date"
                    value={customPeriod.end}
                    onChange={(event) => setCustomPeriod((current) => ({ ...current, end: event.target.value }))}
                    aria-label="Data final"
                  />
                </div>
              )}

              <select
                className="token-filter-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filtrar por status"
              >
                <option value="Todos">Status</option>
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
              </select>

              <select
                className="token-filter-select token-department-select"
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                aria-label="Filtrar por departamento"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department === 'Todos' ? 'Departamento' : department}
                  </option>
                ))}
              </select>

              <select
                className="token-filter-select"
                value={tokenSortOrder}
                onChange={(event) => setTokenSortOrder(event.target.value as TokenSortOrder)}
                aria-label="Ordenar por tokens"
              >
                <option value="default">Ordenar por</option>
                <option value="tokens-desc">Maior consumo</option>
                <option value="tokens-asc">Menor consumo</option>
                <option value="date-desc">Mais recente</option>
                <option value="date-asc">Mais antigo</option>
              </select>
            </div>
          </div>

          <div className="users-table-wrapper token-table-wrapper">
            <table className="users-table token-table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Departamento</th>
                  <th>Tipo</th>
                  <th>Tokens</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr className="token-skeleton-row" key={`skeleton-${index}`}>
                      <td colSpan={7}>
                        <span />
                      </td>
                    </tr>
                  ))}

                {!isLoading && filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="user-cell">
                        <strong className="user-name">{record.user}</strong>
                        <span className="user-email">{record.email}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="department-badge token-tooltip"
                        data-tooltip={`Departamento responsável por ${formatTokens(record.tokens)} tokens no período`}
                      >
                        {record.department}
                      </span>
                    </td>
                    <td>{record.type}</td>
                    <td>
                      <strong className="token-count">{formatTokens(record.tokens)}</strong>
                    </td>
                    <td>{record.date}</td>
                    <td>
                      <span
                        className={`status-badge token-tooltip ${record.status === 'Concluído' ? 'ativo' : 'pendente'}`}
                        data-tooltip={
                          record.status === 'Concluído'
                            ? 'Consumo validado e registrado para auditoria'
                            : 'Registro aguardando consolidação operacional'
                        }
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="token-actions-cell">
                      <button
                        type="button"
                        className="token-row-menu-btn"
                        onClick={() => setOpenActionId((currentId) => (currentId === record.id ? null : record.id))}
                        aria-label={`Abrir ações para ${record.user}`}
                        aria-expanded={openActionId === record.id}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openActionId === record.id && (
                        <div className="token-row-menu" role="menu">
                          {[
                            'Ver detalhes',
                            'Histórico de consumo',
                            'Exportar dados',
                            'Definir limite de tokens',
                            'Sinalizar uso suspeito',
                          ].map((action) => (
                            <button type="button" role="menuitem" key={action} onClick={() => setOpenActionId(null)}>
                              <FileText size={14} />
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {isAddModalOpen && (
        <div className="role-modal-backdrop" role="presentation">
          <form
            className="role-modal token-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="token-modal-title"
            onSubmit={handleAddTokens}
          >
            <header className="role-modal-header">
              <div>
                <h2 id="token-modal-title">Adicionar tokens</h2>
                <p>Informe a quantidade para ampliar a franquia mensal.</p>
              </div>
              <button
                type="button"
                className="role-modal-close"
                onClick={closeAddModal}
                aria-label="Fechar"
              >
                x
              </button>
            </header>

            <div className="invite-form-grid">
              <label className="invite-field">
                <span>Quantidade</span>
                <input
                  type="number"
                  min="1"
                  step="1000"
                  value={tokenAmount}
                  onChange={(event) => setTokenAmount(event.target.value)}
                  placeholder="Ex: 1000000"
                  required
                />
              </label>
            </div>

            <footer className="role-modal-actions">
              <button type="button" className="secondary-btn" onClick={closeAddModal}>
                Cancelar
              </button>
              <button type="submit" className="primary-btn">
                Salvar
              </button>
            </footer>
          </form>
        </div>
      )}

      {isResetModalOpen && (
        <div className="role-modal-backdrop" role="presentation">
          <section
            className="role-modal token-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
          >
            <header className="role-modal-header">
              <div>
                <h2 id="reset-modal-title">Redefinir limite</h2>
                <p>Esta ação volta o limite mensal para o padrão da franquia.</p>
              </div>
              <button
                type="button"
                className="role-modal-close"
                onClick={() => setIsResetModalOpen(false)}
                aria-label="Fechar"
              >
                x
              </button>
            </header>

            <footer className="role-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setIsResetModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="primary-btn danger-btn"
                onClick={() => setIsResetModalOpen(false)}
              >
                Redefinir
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
