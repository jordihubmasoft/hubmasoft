// src/services/familyService.ts
import { Family } from '../types/family';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const FamilyService = {
  getAllFamilies: async (token: string): Promise<Family[]> => {
    const response = await fetch(`${BASE_URL}/Family`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching families: ${response.statusText}`);
    }
    return await response.json();
  },

  getFamilyById: async (id: string, token: string): Promise<Family> => {
    const response = await fetch(`${BASE_URL}/Family/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching family by id: ${response.statusText}`);
    }
    return await response.json();
  },

  createFamily: async (familyData: { name: string }, token: string): Promise<Family> => {
    const response = await fetch(`${BASE_URL}/Family`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(familyData),
    });
    if (!response.ok) {
      throw new Error(`Error creating family: ${response.statusText}`);
    }
    return await response.json();
  },

  updateFamily: async (familyData: Family, token: string): Promise<Family> => {
    const response = await fetch(`${BASE_URL}/Family`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(familyData),
    });
    if (!response.ok) {
      throw new Error(`Error updating family: ${response.statusText}`);
    }
    return await response.json();
  },

  deleteFamily: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/Family/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting family: ${response.statusText}`);
    }
  },
};

export default FamilyService;
