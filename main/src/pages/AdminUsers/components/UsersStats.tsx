interface UsersStatsProps {
  totalUsers: number;
  totalAdmins: number;
  totalDefault: number;
  activeUsers: number;
}

export function UsersStats({
  totalUsers,
  totalAdmins,
  totalDefault,
  activeUsers,
}: UsersStatsProps) {
  const stats = [
    { label: 'USUÁRIOS TOTAIS', value: totalUsers },
    { label: 'ADMINS', value: totalAdmins.toString().padStart(2, '0') },
    { label: 'DEFAULT', value: totalDefault },
    { label: 'USUÁRIOS ATIVOS', value: activeUsers.toString().padStart(2, '0') },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div key={item.label} className="stat-card">
          <span className="stat-label">{item.label}</span>
          <strong className="stat-value">{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
