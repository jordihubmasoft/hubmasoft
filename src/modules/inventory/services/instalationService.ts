import { Instalation } from '../types/instalation';
import { CreateInstalationDto } from '../types/createInstalationDto';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const InstalationService = {
  getAllInstalations: async (token: string): Promise<Instalation[]> => {
    const response = await fetch(`${BASE_URL}/Instalations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching installations: ${response.statusText}`);
    }
    return await response.json();
  },

  getInstalationById: async (id: number | string, token: string): Promise<Instalation> => {
    const response = await fetch(`${BASE_URL}/Instalations/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching installation by id: ${response.statusText}`);
    }
    return await response.json();
  },

  createInstalation: async (instData: CreateInstalationDto, token: string): Promise<Instalation> => {
    const response = await fetch(`${BASE_URL}/Instalations/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instData),
    });
    if (!response.ok) {
      throw new Error(`Error creating installation: ${response.statusText}`);
    }
    return await response.json();
  },

  updateInstalation: async (instData: Instalation, token: string): Promise<Instalation> => {
    const response = await fetch(`${BASE_URL}/Instalations`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instData),
    });
    if (!response.ok) {
      throw new Error(`Error updating installation: ${response.statusText}`);
    }
    return await response.json();
  },

  deleteInstalation: async (id: number | string, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/Instalations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting installation: ${response.statusText}`);
    }
  },
};

export default InstalationService;
