// src/services/SubFamilyService.ts

import { SubFamily, CreateSubFamilyPayload, UpdateSubFamilyPayload } from "../types/subFamily";

export default class SubFamilyService {
  private static baseURL: string = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '') || '';

  // Obtener todas las sub-familias
  static async getAllSubFamilies(token: string): Promise<SubFamily[]> {
    try {
      const url = `${this.baseURL}/Family/subfamilies`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const subFamilias: SubFamily[] = await response.json();
        return subFamilias;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al obtener las sub-familias");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener las sub-familias.");
    }
  }

  // Obtener sub-familias por ID de familia
  static async getSubFamiliesByFamilyId(familyId: string, token: string): Promise<SubFamily[]> {
    try {
      const url = `${this.baseURL}/Family/${familyId}/subfamilies`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const subFamilias: SubFamily[] = await response.json();
        return subFamilias;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al obtener las sub-familias de la familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al obtener las sub-familias de la familia.");
    }
  }

  // Crear una nueva sub-familia
  static async createSubFamily(payload: CreateSubFamilyPayload, token: string): Promise<SubFamily> {
    try {
      const url = `${this.baseURL}/Family/subfamilies`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const nuevaSubFamilia: SubFamily = await response.json();
        return nuevaSubFamilia;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al crear la sub-familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al crear la sub-familia.");
    }
  }

  // Actualizar una sub-familia existente
  static async updateSubFamily(payload: UpdateSubFamilyPayload, token: string): Promise<SubFamily> {
    try {
      const url = `${this.baseURL}/Family/subfamilies`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const subFamiliaActualizada: SubFamily = await response.json();
        return subFamiliaActualizada;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error al actualizar la sub-familia");
      }
    } catch (err: any) {
      console.error("Error en la solicitud:", err.message || err);
      throw new Error("Ocurrió un problema al actualizar la sub-familia.");
    }
  }
}
