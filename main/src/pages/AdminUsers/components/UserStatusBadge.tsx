import type { UserStatus } from '../../../types/user';

interface UserStatusBadgeProps {
  status: UserStatus;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const statusClass = status.toLowerCase();

  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
}