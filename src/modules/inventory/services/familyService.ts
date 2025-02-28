import { Family } from '../types/family';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const FamilyService = {
  /**
   * GET /Family/contact/{contactId}
   */
  getAllFamilies: async (contactId: string, token: string): Promise<Family[]> => {
    const response = await fetch(`${BASE_URL}/Family/contact/${contactId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching families: ${response.statusText}`);
    }
    const result = await response.json();
    // Suponiendo que la respuesta tiene la forma { data: Family[] }
    return result.data;
  },
  

  /**
   * POST /Family
   * Body: { contactId, name }
   */
  createFamily: async (
    data: { contactId: string; name: string },
    token: string
  ): Promise<Family> => {
    const response = await fetch(`${BASE_URL}/Family`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error creating family: ${response.statusText}`);
    }
    return await response.json();
  },

 
  getFamilyById: async (
    familyId: string,
    contactId: string,
    token: string
  ): Promise<Family> => {
    const response = await fetch(
      `${BASE_URL}/Family/${familyId}/contact/${contactId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching family by id: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * Ejemplo de PUT /Family/{familyId}
   * Body: { contactId, name, ... }
   */
  updateFamily: async (
    data: { familyId: string; name: string },
    token: string
  ): Promise<Family> => {
    const response = await fetch(`${BASE_URL}/Family`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error updating family: ${response.statusText}`);
    }
    return await response.json();
  },
  

  /**
   * Ejemplo de DELETE /Family/{familyId}?contactId=...
   */
  deleteFamily: async (
    familyId: string,
    contactId: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(
      `${BASE_URL}/Family/${familyId}?contactId=${contactId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error deleting family: ${response.statusText}`);
    }
  },
};

export default FamilyService;
