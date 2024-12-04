// src/hooks/useCreateContact.ts

import { useState } from "react";
import axios from "axios";

interface CreateContactData {
  name: string;
  surname: string;
  email: string;
}

interface CreateContactResponse {
  contactId: string;
}

export const useCreateContact = () => {
  const [data, setData] = useState<CreateContactResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createContact = async (contactData: CreateContactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/contacts", contactData);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear el contacto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createContact, data, error, loading };
};
