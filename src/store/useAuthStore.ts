// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  agentId: string | null;
  token: string | null;
  contactId: string | null;
  refreshToken: string | null;
  refreshTokenExpiryTime: string | null;
  email: string | null;
  password: string | null;
  resetPasswordToken: string | null;
  setAgentId: (agentId: string | null) => void;
  setToken: (token: string | null) => void;
  setContactId: (contactId: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setRefreshTokenExpiryTime: (expiryTime: string | null) => void;
  setEmail: (email: string | null) => void;
  setPassword: (password: string | null) => void;
  setResetPasswordToken: (token: string | null) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState, [['zustand/persist', AuthState]]>(
  persist(
    (set) => ({
      agentId: null,
      token: null,
      contactId: null,
      refreshToken: null,
      refreshTokenExpiryTime: null,
      email: null,
      password: null,
      resetPasswordToken: null,

      setAgentId: (agentId) => set({ agentId }),
      setContactId: (contactId) => set({ contactId }),
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setRefreshTokenExpiryTime: (expiryTime) =>
        set({ refreshTokenExpiryTime: expiryTime }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setResetPasswordToken: (token) => set({ resetPasswordToken: token }),
      clearUser: () =>
        set({
          agentId: null,
          token: null,
          contactId: null,
          refreshToken: null,
          refreshTokenExpiryTime: null,
          email: null,
          password: null,
          resetPasswordToken: null,
        }),
    }),
    {
      name: 'user', // Clave única en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
