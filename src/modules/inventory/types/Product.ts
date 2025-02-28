// types/Product.ts

export interface Product {
    // Campo opcional en caso de que lo devuelva tu API
    id?: number | string;
    
    // Asigna el contactId si tu API lo requiere (por ejemplo, para asociar el producto con un usuario/contacto).
    contactId?: string;
  
    referencia: string;
    nombre: string;
    descripcion: string;
    familia: string;
    subFamilia: string;
    unidadMedida: string;
    precio: string;
    iva: string;
    descuento: string;
    codigoBarras: string;
    codigoFabricacion: string;
    peso: string;
    nombreTarifa: string;
    subtotal: string;
    impuestos: string;
    total: string;
    tarifas: string;
    precioRecomendado: string;
    proveedor: string;
    costeMedio: string;
    precioCompraSubtotal: string;
    precioCompraImpuestos: string;
    precioCompraTotal: string;
    almacenPredeterminado: string;
    cantidad: number;
  }
  