import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UsersStats } from './components/UsersStats';
import { UsersTable } from './components/UsersTable';
import type { User, UserRole, UserStatus } from '../../types/user';
import '../../styles/admin-users.css';

const USERS_PER_PAGE = 4;

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Carla Mendes',
    email: 'carla.mendes@empresa.com',
    role: 'Admin',
    department: 'Governança / RH',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'João Pereira',
    email: 'joao.pereira@empresa.com',
    role: 'Admin',
    department: 'Tecnologia (TI)',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Ana Souza',
    email: 'ana.souza@empresa.com',
    role: 'Default',
    department: 'Recursos Humanos',
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Rafael Lima',
    email: 'rafael.lima@empresa.com',
    role: 'Default',
    department: 'Financeiro',
    status: 'Ativo',
  },
  {
    id: 5,
    name: 'Marina Costa',
    email: 'marina.costa@empresa.com',
    role: 'Default',
    department: 'Tecnologia (TI)',
    status: 'Bloqueado',
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Default');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>('Ativo');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Default');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === 'Todos' || user.role === roleFilter;

      const matchesDepartment =
        departmentFilter === 'Todos' || user.department === departmentFilter;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [users, search, roleFilter, departmentFilter]);

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === 'Admin').length;
  const totalDefault = users.filter((user) => user.role === 'Default').length;
  const activeUsers = users.filter((user) => user.status === 'Ativo').length;
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const pageStart = (currentPage - 1) * USERS_PER_PAGE;
  const pageEnd = pageStart + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(pageStart, pageEnd);
  const firstVisibleUser = filteredUsers.length === 0 ? 0 : pageStart + 1;
  const lastVisibleUser = Math.min(pageEnd, filteredUsers.length);

  const departments = ['Todos', ...new Set(users.map((user) => user.department))];

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, departmentFilter]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  function handleOpenRoleModal(user: User) {
    setEditingUser(user);
    setSelectedRole(user.role);
    setSelectedStatus(user.status);
  }

  function handleCloseRoleModal() {
    setEditingUser(null);
  }

  function handleSaveRole() {
    if (!editingUser) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === editingUser.id
          ? { ...user, role: selectedRole, status: selectedStatus }
          : user
      )
    );
    handleCloseRoleModal();
  }

  function handleCloseInviteModal() {
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('Default');
  }

  function handleInviteUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextUser: User = {
      id: Math.max(...users.map((user) => user.id), 0) + 1,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      department: 'Não informado',
      role: inviteRole,
      status: 'Ativo',
    };

    setUsers((currentUsers) => [nextUser, ...currentUsers]);
    handleCloseInviteModal();
  }

  return (
    <main className="admin-users-page">
      <section className="admin-users-content">
        <header className="admin-users-header">
          <div>
            <h1>Gerenciamento de Usuários</h1>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={() => setIsInviteModalOpen(true)}
            >
              Convidar usuário
            </button>
          </div>
        </header>

        <UsersStats
          totalUsers={totalUsers}
          totalAdmins={totalAdmins}
          totalDefault={totalDefault}
          activeUsers={activeUsers}
        />

        <section className="users-section">
          <div className="users-section-header">
            <h2>Usuários</h2>

            <div className="filters-row">
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Todos">Papel: Todos</option>
                <option value="Admin">Admin</option>
                <option value="Default">Default</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="filter-select"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department === 'Todos' ? 'Departamento' : department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <UsersTable users={paginatedUsers} onEditRole={handleOpenRoleModal} />

          <div className="table-pagination" aria-label="Paginação de usuários">
            <span className="pagination-summary">
              Mostrando {firstVisibleUser}-{lastVisibleUser} de {filteredUsers.length} usuários
            </span>

            <div className="pagination-actions">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Página anterior"
                title="Página anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="pagination-page">
                Página {currentPage} de {totalPages}
              </span>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
                title="Próxima página"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </section>

      {editingUser && (
        <div className="role-modal-backdrop" role="presentation">
          <section
            className="role-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
          >
            <header className="role-modal-header">
              <div>
                <h2 id="role-modal-title">Editar papel</h2>
                <p>{editingUser.name}</p>
              </div>

              <button
                type="button"
                className="role-modal-close"
                onClick={handleCloseRoleModal}
                aria-label="Fechar"
              >
                x
              </button>
            </header>

            <div className="role-modal-user">
              <span>{editingUser.email}</span>
              <strong>{editingUser.department}</strong>
            </div>

            <fieldset className="role-options">
              <legend>Novo papel</legend>

              <label className="role-option">
                <input
                  type="radio"
                  name="user-role"
                  value="Admin"
                  checked={selectedRole === 'Admin'}
                  onChange={() => setSelectedRole('Admin')}
                />
                <span>
                  <strong>Admin</strong>
                  Acesso ao chat e páginas de gerenciamento.
                </span>
              </label>

              <label className="role-option">
                <input
                  type="radio"
                  name="user-role"
                  value="Default"
                  checked={selectedRole === 'Default'}
                  onChange={() => setSelectedRole('Default')}
                />
                <span>
                  <strong>Default</strong>
                  Acesso apenas ao chat e fontes disponíveis.
                </span>
              </label>
            </fieldset>

            <fieldset className="role-options status-options">
              <legend>Status do usuário</legend>

              <label className="role-option status-option">
                <input
                  type="radio"
                  name="user-status"
                  value="Ativo"
                  checked={selectedStatus === 'Ativo'}
                  onChange={() => setSelectedStatus('Ativo')}
                />
                <span>
                  <strong>Ativo</strong>
                  Usuário liberado para acessar a plataforma.
                </span>
              </label>

              <label className="role-option status-option">
                <input
                  type="radio"
                  name="user-status"
                  value="Bloqueado"
                  checked={selectedStatus === 'Bloqueado'}
                  onChange={() => setSelectedStatus('Bloqueado')}
                />
                <span>
                  <strong>Bloqueado</strong>
                  Usuário sem acesso até nova alteração.
                </span>
              </label>
            </fieldset>

            <footer className="role-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCloseRoleModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={handleSaveRole}
              >
                Salvar alteração
              </button>
            </footer>
          </section>
        </div>
      )}

      {isInviteModalOpen && (
        <div className="role-modal-backdrop" role="presentation">
          <form
            className="role-modal invite-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-modal-title"
            onSubmit={handleInviteUser}
          >
            <header className="role-modal-header">
              <div>
                <h2 id="invite-modal-title">Convidar usuário</h2>
                <p>Adicione uma pessoa à lista de usuários.</p>
              </div>

              <button
                type="button"
                className="role-modal-close"
                onClick={handleCloseInviteModal}
                aria-label="Fechar"
              >
                x
              </button>
            </header>

            <div className="invite-form-grid">
              <label className="invite-field">
                <span>Nome</span>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(event) => setInviteName(event.target.value)}
                  placeholder="Ex: Beatriz Almeida"
                  required
                />
              </label>

              <label className="invite-field">
                <span>E-mail</span>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="nome@empresa.com"
                  required
                />
              </label>
            </div>

            <fieldset className="role-options invite-role-options">
              <legend>Papel inicial</legend>

              <label className="role-option">
                <input
                  type="radio"
                  name="invite-role"
                  value="Admin"
                  checked={inviteRole === 'Admin'}
                  onChange={() => setInviteRole('Admin')}
                />
                <span>
                  <strong>Admin</strong>
                  Acesso ao chat e páginas de gerenciamento.
                </span>
              </label>

              <label className="role-option">
                <input
                  type="radio"
                  name="invite-role"
                  value="Default"
                  checked={inviteRole === 'Default'}
                  onChange={() => setInviteRole('Default')}
                />
                <span>
                  <strong>Default</strong>
                  Acesso apenas ao chat e fontes disponíveis.
                </span>
              </label>
            </fieldset>

            <footer className="role-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCloseInviteModal}
              >
                Cancelar
              </button>
              <button type="submit" className="primary-btn">
                Enviar convite
              </button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}
