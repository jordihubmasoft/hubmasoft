// src/store/useAuthStore.ts
import { create } from 'zustand';

// Define the interface for the state
interface AuthState {
  agentId: string | null;
  token: string | null;
  refreshToken: string | null;
  refreshTokenExpiryTime: string | null;
  email: string | null;
  password: string | null;
  resetPasswordToken: string | null;
  setAgentId: (agentId: string | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setRefreshTokenExpiryTime: (expiryTime: string | null) => void;
  setEmail: (email: string | null) => void;
  setPassword: (password: string | null) => void;
  setResetPasswordToken: (token: string | null) => void;
  clearUser: () => void;
}

// Create the store using create from 'zustand'
const useAuthStore = create<AuthState>((set) => ({
  agentId: null,
  token: null,
  refreshToken: null,
  refreshTokenExpiryTime: null,
  email: null,
  password: null,
  resetPasswordToken: null,

  setAgentId: (agentId) => set({ agentId }),
  setToken: (token) => set({ token }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setRefreshTokenExpiryTime: (expiryTime) =>
    set({ refreshTokenExpiryTime: expiryTime }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setResetPasswordToken: (token) => set({ resetPasswordToken: token }),

  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    set({
      agentId: null,
      token: null,
      refreshToken: null,
      refreshTokenExpiryTime: null,
      email: null,
      password: null,
      resetPasswordToken: null,
    });
  },
}));

export default useAuthStore;
