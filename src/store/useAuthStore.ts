// src/store/useAuthStore.ts
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

// Define la interfaz del estado para el usuario
interface AuthState {
    agentId: string | null;
    token: string | null;
    refreshToken: string | null;
    refreshTokenExpiryTime: string | null;
    email: string | null; // Campo para email
    password: string | null; // Campo para password
    resetPasswordToken: string | null; // Añadir el campo resetPasswordToken
    setAgentId: (agentId: string | null) => void;
    setToken: (token: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    setRefreshTokenExpiryTime: (expiryTime: string | null) => void;
    setEmail: (email: string | null) => void; // Setter para email
    setPassword: (password: string | null) => void; // Setter para password
    setResetPasswordToken: (token: string | null) => void; // Setter para resetPasswordToken
    clearUser: () => void;
}

// Función para cargar los datos del usuario desde Local Storage
const loadUserFromLocalStorage = () => {
  if (typeof window === 'undefined') return {
    agentId: null,
    token: null,
    refreshToken: null,
    refreshTokenExpiryTime: null,
  };
  
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : {
    agentId: null,
    token: null,
    refreshToken: null,
    refreshTokenExpiryTime: null,
  };
};

// Crear el store de Zustand
const authStore = createStore<AuthState>((set) => ({
    agentId: null,
    token: null,
    refreshToken: null,
    refreshTokenExpiryTime: null,
    email: null, // Valor inicial para email
    password: null, // Valor inicial para password
    resetPasswordToken: null, // Valor inicial para resetPasswordToken
    
    setAgentId: (agentId) => set({ agentId }),
    setToken: (token) => set({ token }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
    setRefreshTokenExpiryTime: (expiryTime) => set({ refreshTokenExpiryTime: expiryTime }),
    setEmail: (email) => set({ email }), // Define el setter para email
    setPassword: (password) => set({ password }), // Define el setter para password
    setResetPasswordToken: (token) => set({ resetPasswordToken: token }), // Define el setter para resetPasswordToken
  
    clearUser: () => {
      localStorage.removeItem('user');
      set({
        agentId: null,
        token: null,
        refreshToken: null,
        refreshTokenExpiryTime: null,
        email: null, // Resetea email
        password: null, // Resetea password
        resetPasswordToken: null, // Resetea resetPasswordToken
      });
    },
  }));

// Hook personalizado para usar el store en React
const useAuthStore = () => useStore(authStore);

export default useAuthStore;
