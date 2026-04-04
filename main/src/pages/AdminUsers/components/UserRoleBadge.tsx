import type { UserRole } from '../../../types/user';

interface UserRoleBadgeProps {
  role: UserRole;
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span className={`role-badge ${role.toLowerCase()}`}>
      {role}
    </span>
  );
}