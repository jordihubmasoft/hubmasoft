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
   */
  createProduct: async (productData: Product, token: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/Product`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: productData.nombre || 'Default Name',
      description: productData.descripcion || 'Default description',
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
      installationId:
        productData.installationId && productData.installationId[0] !== ''
          ? [productData.installationId[0]]
          : []
    }),
    
    
  });
  if (!response.ok) {
    throw new Error(`Error creating product: ${response.statusText}`);
  }
  return await response.json();
},

  

  /**
   * Actualiza un producto existente (PUT /Product)
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
        // Aquí se utiliza el primer elemento del array installationId
        installationId: 
          productData.installationId && productData.installationId[0] !== ''
            ? [productData.installationId[0]]
            : [],
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
