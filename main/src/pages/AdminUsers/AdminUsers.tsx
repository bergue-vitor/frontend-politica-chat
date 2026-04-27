import { useMemo, useState } from 'react';
import { UsersStats } from './components/UsersStats';
import { UsersTable } from './components/UsersTable';
import type { User, UserRole } from '../../types/user';
import '../../styles/admin-users.css';

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
    status: 'Pendente',
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
  const pendingInvites = users.filter((user) => user.status === 'Pendente').length;

  const departments = ['Todos', ...new Set(users.map((user) => user.department))];

  function handleOpenRoleModal(user: User) {
    setEditingUser(user);
    setSelectedRole(user.role);
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
          ? { ...user, role: selectedRole }
          : user
      )
    );
    handleCloseRoleModal();
  }

  return (
    <main className="admin-users-page">
      <section className="admin-users-content">
        <header className="admin-users-header">
          <div>
            <h1>Gerenciamento de Usuários</h1>
          </div>

          <div className="header-actions">
            <button className="secondary-btn">Exportar usuários</button>
            <button className="primary-btn">Convidar usuário</button>
          </div>
        </header>

        <UsersStats
          totalUsers={totalUsers}
          totalAdmins={totalAdmins}
          totalDefault={totalDefault}
          pendingInvites={pendingInvites}
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

          <UsersTable users={filteredUsers} onEditRole={handleOpenRoleModal} />
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
    </main>
  );
}
