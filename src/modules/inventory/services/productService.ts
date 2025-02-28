// services/productService.ts

import { Product } from '../types/Product';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

class ProductService {
  /**
   * Obtiene todos los productos (endpoint: GET /Product/Get).
   */
  static async getAll(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/Product`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener la lista de productos');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Obtiene productos filtrados por ContactId (endpoint: GET /Product/GetByContactId).
   */
  static async getByContactId(contactId: string, token: string) {
    try {
      const response = await fetch(`${BASE_URL}/GetByContactId?contactId=${contactId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos por ContactId');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto (endpoint: POST /Product/Create).
   */
  static async create(product: Product, token: string) {
    try {
      // Se construye el payload sin el wrapper "productRequest"
      const payload = {
        Name: product.name,
        Description: product.descripcion,
        ContactId: product.contactId,
        Reference: product.referencia,
        BarCode: product.codigoBarras,
        ManufacturingCode: product.codigoFabricacion,
        CompanyCode: product.familia,
        Tags: "", // O product.tags si lo tienes
        Weight: parseFloat(product.peso) || 0,
        RecommendedPrice: parseFloat(product.precioRecomendado) || 0,
        AvarageCost: parseFloat(product.costeMedio) || 0,
        Supplier: product.proveedor,
        WareHouse: product.almacenPredeterminado,
        RateName: product.nombreTarifa,
        Stock: product.cantidad,
        SubFamilyId: null, // O product.subFamilyId si dispones de él
        SubFamily: product.subFamilia || null,
      };

      // Se envía el payload directamente en el body
      const response = await fetch(`${BASE_URL}/Product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Actualiza un producto existente (endpoint: PUT /Product/UpdateProduct).
   */
  static async update(product: Product, token: string) {
    try {
      const response = await fetch(`${BASE_URL}/UpdateProduct`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Elimina un producto (endpoint: DELETE /Product/Delete).
   * Se asume que se pasa como query param: /Delete?productId=XX
   */
  static async delete(productId: number | string, token: string) {
    try {
      const response = await fetch(`${BASE_URL}/Delete?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProductService;
