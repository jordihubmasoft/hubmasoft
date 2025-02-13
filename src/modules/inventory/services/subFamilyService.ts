// src/services/subFamilyService.ts
import { SubFamily } from '../types/subFamily';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const SubFamilyService = {
  getSubFamiliesByFamilyId: async (familyId: string, token: string): Promise<SubFamily[]> => {
    const response = await fetch(`${BASE_URL}/Family/${familyId}/subfamilies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching sub-families: ${response.statusText}`);
    }
    return await response.json();
  },

  createSubFamily: async (
    subFamilyData: { familyId: string; name: string },
    token: string
  ): Promise<SubFamily> => {
    const response = await fetch(`${BASE_URL}/Family/subfamilies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subFamilyData),
    });
    if (!response.ok) {
      throw new Error(`Error creating sub-family: ${response.statusText}`);
    }
    return await response.json();
  },

  updateSubFamily: async (
    subFamilyData: { subfamilyId: string; name: string },
    token: string
  ): Promise<SubFamily> => {
    const response = await fetch(`${BASE_URL}/Family/subfamilies/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subFamilyData),
    });
    if (!response.ok) {
      throw new Error(`Error updating sub-family: ${response.statusText}`);
    }
    return await response.json();
  },

  deleteSubFamily: async (subFamilyId: string, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/Family/subfamilies/${subFamilyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting sub-family: ${response.statusText}`);
    }
  },
};

export default SubFamilyService;
