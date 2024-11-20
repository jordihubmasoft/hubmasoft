// src/types/UserLogin.ts
export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  agentId: string;
  contactId: string;
  avatarUrl?: string; // Añadido para la URL del avatar
}
