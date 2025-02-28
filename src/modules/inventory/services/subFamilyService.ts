import { SubFamily } from '../types/subFamily';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const SubFamilyService = {
  /**
   * GET /SubFamily/contact/{contactId}/family/{familyId}
   */
  getSubFamiliesByFamilyId: async (
    contactId: string,
    familyId: string,
    token: string
  ): Promise<SubFamily[]> => {
    const response = await fetch(
      `${BASE_URL}/Family/${contactId}/subfamilies`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching sub-families: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data; // Extraemos el array de subfamilias
  },
  

  /**
   * POST /SubFamily
   * Body: { contactId, familyId, name }
   */
  createSubFamily: async (
    data: { contactId: string; familyId: string; name: string },
    token: string
  ): Promise<SubFamily> => {
    const response = await fetch(`${BASE_URL}/Family/subfamilies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error creating sub-family: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data; // Se extrae la subfamilia desde json.data
  },
  

  // ---------------------------------------------------------------------------------
  // A CONTINUACIÓN, EJEMPLOS DE MÉTODOS PARA UPDATE/DELETE (POR SI TU BACKEND LOS TIENE).
  // SI NO LOS NECESITAS, PUEDES ELIMINARLOS O ADAPTARLOS.
  // ---------------------------------------------------------------------------------

  /**
   * Ejemplo de PUT /SubFamily/{subFamilyId}
   * Body: { contactId, name, ... }
   */
  updateSubFamily: async (
    subfamilyId: string,
    data: { subfamilyId: string; name: string },
    token: string
  ): Promise<SubFamily> => {
    const response = await fetch(`${BASE_URL}/Family/subfamilies`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subfamilyId: data.subfamilyId,
        name: data.name,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error updating sub-family: ${response.statusText}`);
    }
  
    return await response.json();
  },
  /**
   * Ejemplo de DELETE /SubFamily/{subFamilyId}?contactId=...
   */
  deleteSubFamily: async (
    subFamilyId: string,
    contactId: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(
      `${BASE_URL}/Family/subfamilies/${subFamilyId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error deleting sub-family: ${response.statusText}`);
    }
  },
};

export default SubFamilyService;
