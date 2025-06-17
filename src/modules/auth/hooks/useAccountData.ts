import { useState, useEffect } from 'react';
import useAuthStore from '../../../store/useAuthStore';
import ContactService from '../../../services/ContactService';

export default function useAccountData() {
  const { token, contactId, agentId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [originalContact, setOriginalContact] = useState<any>(null);
  const [accountData, setAccountData] = useState({
    empresa: '',
    nif: '',
    comercial: '',
    vat: '',
    email: '',
    telefono: '',
    direccion: '',
    poblacion: '',
    postal: '',
    provincia: '',
    pais: '',
    logo: '',
  });

  useEffect(() => {
    const fetchContact = async () => {
      if (!contactId || !token) return;
      setLoading(true);
      try {
        const response = await ContactService.getContactById(contactId, token);
        if (response?.data?.length > 0) {
          const c = response.data[0];
          setOriginalContact(c);
          setAccountData({
            empresa: c.companyName || '',
            nif: c.nif || '',
            comercial: '',
            vat: '',
            email: c.email || '',
            telefono: c.telefono || '',
            direccion: '',
            poblacion: c.poblacion || '',
            postal: '',
            provincia: c.provincia || '',
            pais: c.pais || '',
            logo: '',
          });
        }
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
    // eslint-disable-next-line
  }, [contactId, token, agentId]);

  const handleChangeAccount = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAccount = async () => {
    if (!token || !agentId) return;
    setLoading(true);
    try {
      const payload: any = {
        ...originalContact,
        userId: agentId,
        contactId: contactId,
        companyName: accountData.empresa,
        nie: accountData.nif,
        commercialName: accountData.comercial,
        vatIdentification: accountData.vat,
        email: accountData.email,
        phone: accountData.telefono,
        address: accountData.direccion,
        city: accountData.poblacion,
        postalCode: accountData.postal,
        province: accountData.provincia,
        country: accountData.pais,
        logo: accountData.logo,
      };
      let response = await ContactService.updateContact(payload, token);
      if (response?.data) {
        setOriginalContact(response.data);
        // Actualiza el estado con los datos guardados
        setAccountData(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      // Manejo de error
    } finally {
      setLoading(false);
    }
  };

  return {
    accountData,
    setAccountData,
    loading,
    handleChangeAccount,
    handleSaveAccount,
  };
} 