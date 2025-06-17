import { useState, useEffect } from 'react';
import useAuthStore from '../../../store/useAuthStore';
import ContactService from '../../../services/ContactService';

export default function useProfileData() {
  const { token, contactId, agentId } = useAuthStore();
  const [hasContact, setHasContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalContact, setOriginalContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    country: '',
    city: '',
    userType: '',
    phone: '',
    address: '',
    postalCode: '',
    nie: '',
    commercialName: '',
    vatIdentification: '',
    province: '',
    mobile: '',
    website: '',
    contactId: '',
    shippingAddress: '',
    shippingCity: '',
    shippingProvince: '',
    shippingPostalCode: '',
    shippingCountry: '',
    userId: '',
    skills: '',
    experience: '',
    companyName: '',
    companySize: '',
    phone1: '',
    salesTax: 0,
    equivalenceSurcharge: 0,
    shoppingTax: 0,
    paymentDay: 0,
    tags: '',
    vatType: '',
    internalReference: '',
    language: '',
    currency: '',
    paymentMethod: '',
    paymentExpirationDays: '',
    paymentExpirationDay: '',
    rate: '',
    discount: '',
    swift: '',
    iban: '',
    contactProfile: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      if (!contactId || !token) return;
      setLoading(true);
      try {
        const response = await ContactService.getContactById(contactId, token);
        if (response?.data?.length > 0) {
          const contactData = response.data[0] as any;
          setOriginalContact(contactData);
          setFormData((prev) => ({
            ...prev,
            name: contactData.name || '',
            surname: contactData.surname || '',
            email: contactData.email || '',
            country: contactData.country || '',
            city: contactData.city || '',
            userType: contactData.userType || '',
            phone: contactData.phone || '',
            address: contactData.address || '',
            postalCode: contactData.postalCode || '',
            nie: contactData.nie || '',
            commercialName: contactData.commercialName || '',
            vatIdentification: contactData.vatIdentification || '',
            province: contactData.province || '',
            mobile: contactData.mobile || '',
            website: contactData.website || '',
            contactId: contactData.id ? contactData.id.toString() : '',
            userId: agentId || '',
            skills: contactData.skills || '',
            experience: contactData.experience || '',
            companyName: contactData.companyName || '',
            companySize: contactData.companySize || '',
            shippingAddress: contactData.extraInformation?.shippingAddress?.[0]?.direction || '',
            shippingCity: contactData.extraInformation?.shippingAddress?.[0]?.city || '',
            shippingProvince: contactData.extraInformation?.shippingAddress?.[0]?.province || '',
            shippingPostalCode: contactData.extraInformation?.shippingAddress?.[0]?.postalCode || '',
            shippingCountry: contactData.extraInformation?.shippingAddress?.[0]?.country || '',
            contactProfile: contactData.contactProfile || ''
          }));
          setHasContact(true);
        } else {
          setFormData((prev) => ({ ...prev, name: '', surname: '', email: '', phone: '', language: '' }));
          setHasContact(false);
        }
      } catch (error) {
        setFormData((prev) => ({ ...prev, name: '', surname: '', email: '', phone: '', language: '' }));
        setHasContact(false);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
    // eslint-disable-next-line
  }, [contactId, token, agentId]);

  const handleChangeProfileForm = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmitProfile = async () => {
    if (!token || !agentId) return;
    setLoading(true);
    try {
      const payload: any = {
        ...originalContact,
        userId: agentId,
        contactId: contactId,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        nie: formData.nie,
        address: formData.address,
        province: formData.province,
        country: formData.country,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        phone1: formData.phone1 || '',
        website: formData.website,
        vatIdentification: formData.vatIdentification || '',
        salesTax: formData.salesTax || 0,
        equivalenceSurcharge: formData.equivalenceSurcharge || 0,
        shoppingTax: formData.shoppingTax || 0,
        paymentDay: formData.paymentDay || 0,
        tags: formData.tags || '',
        vatType: formData.vatType || '',
        internalReference: formData.internalReference || '',
        language: formData.language || '',
        currency: formData.currency || '',
        paymentMethod: formData.paymentMethod || '',
        paymentExpirationDays: formData.paymentExpirationDays || '',
        paymentExpirationDay: formData.paymentExpirationDay || '',
        rate: formData.rate || '',
        discount: formData.discount || '',
        swift: formData.swift || '',
        iban: formData.iban || '',
        shippingAddress: [
          {
            direction: formData.shippingAddress,
            city: formData.shippingCity,
            postalCode: formData.shippingPostalCode,
            province: formData.shippingProvince,
            country: formData.shippingCountry,
          },
        ],
        companyName: formData.companyName,
        commercialName: formData.commercialName,
        contactProfile: formData.contactProfile || originalContact?.contactProfile,
      };
      let response;
      if (hasContact) {
        response = await ContactService.updateContact(payload, token);
      } else {
        const { contactId, ...createPayload } = payload;
        response = await ContactService.createContact(createPayload, token);
      }
      if (response?.data) {
        setHasContact(true);
        setOriginalContact(response.data);
        setFormData((prev) => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      // Manejo de error
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    hasContact,
    handleChangeProfileForm,
    handleSubmitProfile,
  };
} 