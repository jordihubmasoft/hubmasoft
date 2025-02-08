// src/types/Contact.ts

export interface ShippingAddress {
  direccion: string;
  poblacion: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
}

export interface ExtraInformation {
  contact: string;
  salesTax: number;
  equivalenceSurcharge: number;
  shoppingTax: number;
  paymentDay: number;
  vatType: string;
  internalReference: string;
  language: string;
  currency: string;
  paymentMethod: string;
  paymentExpirationDays: string;
  paymentExpirationDay: string;
  rate: string;
  discount: string;
  swift: string;
  iban: string;
  shippingAddress: ShippingAddress[];
  id: number;
  creationDate: string;
  active: boolean;
  updatingDate: string;
}

export interface Contact {
  id: string;
  userId: string;
  // Campos principales en español
  nombre: string;             // antes "name"
  email: string;
  pais: string;               // antes "country"
  poblacion: string;          // antes "city"
  tipoContacto: string;       // antes "userType"
  telefono: string;           // antes "phone"
  movil: string;              // antes "mobile"
  sitioWeb: string;           // antes "website"
  direccion: string;          // antes "address"
  codigoPostal: string;       // antes "postalCode"
  nif: string;                // antes "nie"
  nombreComercial: string;    // antes "commercialName"
  provincia: string;
  identificacionVAT: string;  // de extraInformation.vatType
  tags: string;               // campo adicional
  idioma: string;             // de extraInformation.language
  moneda: string;             // de extraInformation.currency
  formaPago: string;          // de extraInformation.paymentMethod
  diasVencimiento: string;    // de extraInformation.paymentExpirationDays
  diaVencimiento: string;     // de extraInformation.paymentExpirationDay
  tarifa: string;             // de extraInformation.rate
  descuento: string;          // de extraInformation.discount
  cuentaCompras: string;      // campo adicional
  cuentaPagos: string;        // campo adicional
  swift: string;              // de extraInformation.swift
  iban: string;               // de extraInformation.iban
  refMandato: string;         // campo adicional
  referenciaInterna: string;   // de extraInformation.internalReference
  comercialAsignado: string;  // campo adicional
  tipoIVA: string[];          // se construye a partir de extraInformation.vatType (en arreglo)
  informacionAdicional: string; // campo adicional
  // Campos opcionales adicionales
  skills?: string;
  experience?: string;
  companyName?: string;
  companySize?: string;
  // Se conserva la información extra original, de forma opcional
  extraInformation?: ExtraInformation;
}
