// services/PrefixConfigService.ts
import { PrefixConfig, CreatePrefixConfigDto } from '../types/prefixConfig';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

/**
 * Servicio para manejar la configuración de prefijos (PrefixConfig).
 * Metodos:
 *  - getByContactId: obtener prefijos por ContactId
 *  - createPrefixConfig: crear un nuevo prefijo
 *  - updatePrefixConfig: actualizar un prefijo existente
 *  - deletePrefixConfig: eliminar un prefijo por id
 */
const PrefixConfigService = {
  /**
   * GET /PrefixConfig/contact/{contactId}
   */
  getByContactId: async (token: string, contactId: string): Promise<PrefixConfig[]> => {
    const response = await fetch(`${BASE_URL}/PrefixConfig/contact/${contactId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching prefix config by contactId: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * POST /PrefixConfig
   */
  createPrefixConfig: async (prefixData: CreatePrefixConfigDto, token: string): Promise<PrefixConfig> => {
    const response = await fetch(`${BASE_URL}/PrefixConfig`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prefixData),
    });
    if (!response.ok) {
      throw new Error(`Error creating prefix config: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * PUT /PrefixConfig
   */
  updatePrefixConfig: async (prefixData: PrefixConfig, token: string): Promise<PrefixConfig> => {
    const response = await fetch(`${BASE_URL}/PrefixConfig`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prefixData),
    });
    if (!response.ok) {
      throw new Error(`Error updating prefix config: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * DELETE /PrefixConfig/{id}
   */
  deletePrefixConfig: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/PrefixConfig/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting prefix config: ${response.statusText}`);
    }
  },
};

export default PrefixConfigService;
