import { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

type UserRole = '2' | '1';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextData {
  user: User;
  isAuthenticated: boolean;
  loginAsAdmin: () => void;
  loginAsUser: () => void;
  updateProfile: (profile: Pick<User, 'name' | 'email'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: 'Admin',
    email: '@email.com',
    role: '2', 
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function loginAsAdmin() {
    setUser({
      name: 'Admin',
      email: 'admin@email.com',
      role: '2',
    });
    setIsAuthenticated(true);
  }

  function loginAsUser() {
    setUser({
      name: 'User',
      email: 'user@email.com',
      role: '1',
    });
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  function updateProfile(profile: Pick<User, 'name' | 'email'>) {
    setUser((currentUser) => ({
      ...currentUser,
      ...profile,
    }));
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loginAsAdmin,
      loginAsUser,
      updateProfile,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
