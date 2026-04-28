interface UsersStatsProps {
  totalUsers: number;
  totalAdmins: number;
  totalDefault: number;
  pendingInvites: number;
}

export function UsersStats({
  totalUsers,
  totalAdmins,
  totalDefault,
  pendingInvites,
}: UsersStatsProps) {
  const stats = [
    { label: 'USUÁRIOS TOTAIS', value: totalUsers },
    { label: 'ADMINS', value: totalAdmins.toString().padStart(2, '0') },
    { label: 'DEFAULT', value: totalDefault },
    { label: 'CONVITES PENDENTES', value: pendingInvites.toString().padStart(2, '0') },
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
