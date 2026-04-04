import { useMemo, useState } from 'react';
import { UsersStats } from './components/UsersStats';
import { UsersTable } from './components/UsersTable';
import type { User } from '../../types/user';
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
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === 'Todos' || user.role === roleFilter;

      const matchesDepartment =
        departmentFilter === 'Todos' || user.department === departmentFilter;

      return matchesSearch && matchesRole && matchesDepartment;
    });
  }, [search, roleFilter, departmentFilter]);

  const totalUsers = mockUsers.length;
  const totalAdmins = mockUsers.filter((user) => user.role === 'Admin').length;
  const totalDefault = mockUsers.filter((user) => user.role === 'Default').length;
  const pendingInvites = mockUsers.filter((user) => user.status === 'Pendente').length;

  const departments = ['Todos', ...new Set(mockUsers.map((user) => user.department))];

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

          <UsersTable users={filteredUsers} />
        </section>
      </section>
    </main>
  );
}