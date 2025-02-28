import { Product } from '../types/Product';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/+$/, '');

const ProductService = {
  /**
   * Obtiene todos los productos (GET /Product)
   */
  getAllProducts: async (token: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * Obtiene productos por ContactId (GET /Product/contact/{ContactId})
   */
  getProductsByContactId: async (contactId: string, token: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/Product/contact/${contactId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching products by contactId: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * Crea un nuevo producto (POST /Product)
   *
   * Cuerpo de ejemplo:
   * {
   *   "name": "test",
   *   "description": "string",
   *   "reference": "string",
   *   "companyCode": "string",
   *   "tags": "string",
   *   "stock": 0,
   *   "price": 0,
   *   "purchasePrice": 0,
   *   "costValue": 0,
   *   "sellsValue": 0,
   *   "priceWithoutVAT": 0,
   *   "percentageVAT": 0,
   *   "contactId": "{{ContactId}}",
   *   "installationId": [
   *     "string"
   *   ]
   * }
   */
  createProduct: async (productData: Product, token: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: productData.nombre || '',
        description: productData.descripcion || '',
        reference: productData.referencia || '',
        companyCode: productData.familia || '',
        tags: productData.subFamilia || '',
        stock: productData.cantidad ? Number(productData.cantidad) : 0,
        price: productData.precio ? Number(productData.precio) : 0,
        purchasePrice: productData.precioCompraTotal ? Number(productData.precioCompraTotal) : 0,
        costValue: 0,
        sellsValue: 0,
        priceWithoutVAT: 0,
        percentageVAT: productData.iva ? Number(productData.iva) : 0,
        contactId: productData.contactId || '',
        installationId: ['string'],
      }),
    });
    if (!response.ok) {
      throw new Error(`Error creating product: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * Actualiza un producto existente (PUT /Product)
   *
   * Cuerpo de ejemplo:
   * {
   *   "name": "test prueba",
   *   "description": "pruebas",
   *   "reference": "string",
   *   "companyCode": "string",
   *   "tags": "string",
   *   "price": 0,
   *   "purchasePrice": 0,
   *   "costValue": 0,
   *   "sellsValue": 0,
   *   "priceWithoutVAT": 0,
   *   "percentageVAT": 0,
   *   "contactId": "string",
   *   "installationId": [
   *     "6E7C36DD-4121-4C81-97C2-9CA075020129"
   *   ],
   *   "productId": "70BD503E-DCE2-4C0E-8176-A44A60CADC32"
   * }
   */
  updateProduct: async (productData: Product, token: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/Product`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: productData.nombre || '',
        description: productData.descripcion || '',
        reference: productData.referencia || '',
        companyCode: productData.familia || '',
        tags: productData.subFamilia || '',
        price: productData.precio ? Number(productData.precio) : 0,
        purchasePrice: productData.precioCompraTotal ? Number(productData.precioCompraTotal) : 0,
        costValue: 0,
        sellsValue: 0,
        priceWithoutVAT: 0,
        percentageVAT: productData.iva ? Number(productData.iva) : 0,
        contactId: productData.contactId || '',
        installationId: ['string'],
        productId: productData.id || '',
      }),
    });
    if (!response.ok) {
      throw new Error(`Error updating product: ${response.statusText}`);
    }
    return await response.json();
  },

  /**
   * Elimina un producto (DELETE /Product/{ProductId})
   */
  deleteProduct: async (id: number | string, token: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/Product/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }
  },
};

export default ProductService;
