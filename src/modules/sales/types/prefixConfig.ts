// types/prefixConfig.ts

export interface CreatePrefixConfigDto {
    prefix: string;
    prefixType: number;     // 0 -> Sale, 1 -> Purchase, etc.
    id: string;
    active: boolean;
    contactId: string;
  }
  
  // Ajusta esto según la estructura real de tu respuesta:
  export interface PrefixConfig {
    contact?: any;         // Aquí puedes poner la interfaz real del "contact"
    prefix: string;
    prefixType: number;
    id: string;
    creationDate?: string;
    active: boolean;
    updatingDate?: string;
  }
  