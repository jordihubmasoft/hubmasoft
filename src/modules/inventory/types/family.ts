// src/types/Family.ts

import { SubFamily } from './subFamily';

export interface Family {
  id: string; // Asegúrate de que la respuesta del backend incluya un campo 'id'
  name: string;
  showInCatalog: boolean;
  showInOrders: boolean;
  subFamilies: SubFamily[];
}

export interface CreateFamilyPayload {
  name: string;
}

export interface UpdateFamilyPayload {
  name: string;
  familyId: string;
}
