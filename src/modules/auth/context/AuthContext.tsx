// src/modules/auth/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import useAuthStore from '../../../store/useAuthStore';

// Define el contexto y el tipo de usuario
interface AuthContextType {
  user: {
    name: string;
    email: string;
    surname?: string;
    avatarUrl?: string;
  } | null;
  login: (userData: { name: string; email: string; avatarUrl?: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const clearUser = useAuthStore((state) => state.clearUser);

  // Guarda los datos del usuario en el estado local y en el LocalStorage
  const login = (userData: { name: string; email: string; avatarUrl?: string }) => {
    console.log('Guardando usuario:', userData);
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    clearUser();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  // Cuando la app carga, recupera los datos del usuario del LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      console.log('Usuario almacenado:', storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
