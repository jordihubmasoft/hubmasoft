import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Select,
  MenuItem,
  Menu,
  Checkbox,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { Bar, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
} from "chart.js";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { useTranslation } from "../../../hooks/useTranslations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "@mui/material/Fade";
import UserInfoDialog from "../components/UserInfoDialog";
import Zoom from "@mui/material/Zoom";
import useAuthStore from "../../../store/useAuthStore";
import {
  FiShoppingCart,
  FiDollarSign,
  FiBarChart2,
  FiTrendingUp,
  FiFileText,
  FiCalendar,
  FiRefreshCcw,
  FiUser,
} from "react-icons/fi";
import { UserChecker } from "components/UserChecker";
import ContactService from "services/ContactService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// **Definición de la interfaz FormErrors**
interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  phone?: string;
  userType?: string;
  skills?: string;
  experience?: string;
  companyName?: string;
  companySize?: string;
  nie?: string;
  commercialName?: string;
  province?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingProvince?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  [key: string]: string | undefined;
}

const initialChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const Dashboard = () => {
  const router = useRouter();
  const { token, contactId, agentId } = useAuthStore();

  // Flag de hidratación
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const [open, setOpen] = useState(true);
  const [userType, setUserType] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState("7 días");
  const [amount, setAmount] = useState("€0,00");
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(initialChartData);
  const [hasContact, setHasContact] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    userType: "",
    phone: "",
    address: "",
    postalCode: "",
    nie: "",
    commercialName: "",
    province: "",
    
    shippingAddress: "",
    shippingCity: "",
    website: "",
    contactId: "",
    shippingProvince: "",
    shippingPostalCode: "",
    shippingCountry: "",
    userId: "",
    skills: "",
    experience: "",
    companyName: "",
    companySize: "",
    phone1: "",
    vatIdentification: "",
    salesTax: 0,
    equivalenceSurcharge: 0,
    shoppingTax: 0,
    paymentDay: 0,
    tags: "",
    vatType: "",
    internalReference: "",
    language: "",
    currency: "",
    paymentMethod: "",
    paymentExpirationDays: "",
    paymentExpirationDay: "",
    rate: "",
    discount: "",
    swift: "",
    iban: "",
    shippingAddresses: [
      {
        direction: "",
        city: "",
        postalCode: "",
        province: "",
        country: ""
      }
    ]
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (hydrated && !token) {
      router.push("/auth/login");
    }
  }, [hydrated, token, router]);

  useEffect(() => {
    const fetchContact = async () => {
      if (!open || !contactId || !token) return;
  
      setLoadingState(true);
      try {
        const response = await ContactService.getContactById(contactId, token);
  
        if (response?.data?.length > 0) {
          const contactData = response.data[0] as any;
          setFormData((prev) => ({
            ...prev,
            name: contactData.name || "",
            email: contactData.email || "",
            country: contactData.country || "",
            city: contactData.city || "",
            // userType vendrá de contactProfile (1 o 2), si lo necesitas
            // Por ejemplo, si contactData.contactProfile === 1 => userType = 'freelancer'
            // contactProfile === 2 => userType = 'company'
            userType: contactData.contactProfile === 1 
                      ? "freelancer" 
                      : contactData.contactProfile === 2 
                      ? "company" 
                      : "",
            phone: contactData.phone || "",
            address: contactData.address || "",
            postalCode: contactData.postalCode || "",
            nie: contactData.nie || "",
            commercialName: contactData.commercialName || "",
            province: contactData.province || "",
            phone1: contactData.phone1 || "",
            website: contactData.website || "",
            contactId: contactData.id ? contactData.id.toString() : "",
            userId: agentId || "",
            skills: contactData.skills || "",
            experience: contactData.experience || "",
            companyName: contactData.companyName || "",
            companySize: contactData.companySize || "",
            shippingAddress: contactData.extraInformation?.shippingAddress?.[0]?.direction || "",
            shippingCity: contactData.extraInformation?.shippingAddress?.[0]?.city || "",
            shippingProvince: contactData.extraInformation?.shippingAddress?.[0]?.province || "",
            shippingPostalCode: contactData.extraInformation?.shippingAddress?.[0]?.postalCode || "",
            shippingCountry: contactData.extraInformation?.shippingAddress?.[0]?.country || "",
          }));
          setHasContact(true);
        } else {
          resetFormData();
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        resetFormData();
      } finally {
        setLoadingState(false);
      }
    };
  
    const resetFormData = () => {
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        country: "",
        city: "",
        userType: "",
        phone: "",
        address: "",
        postalCode: "",
        nie: "",
        commercialName: "",
        province: "",
        phone1: "",
        website: "",
        contactId: "",
        shippingAddress: "",
        shippingCity: "",
        shippingProvince: "",
        shippingPostalCode: "",
        shippingCountry: "",
        userId: agentId || "",
        experience: "",
        companyName: "",
        companySize: "",
      }));
      setHasContact(false);
    };
  
    fetchContact();
  }, [open, contactId, token, agentId, refresh]);
  
  // Estado para los widgets
  const [widgets, setWidgets] = useState({
    showVentas: true,
    showClientes: true,
    showImpuestos: true,
    showImpuestosEnVenta: true,
    showBalance: true,
    showInvoicesToReceive: true,
    showInvoicesToPay: true,
    showComparacionVentas: true,
    showFlujoTransacciones: true,
    showMejoresClientes: true,
    showProductosVendidos: true,
    showDevolucionesClientes: true,
    showClientesConVentas: true,
  });
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleWidgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidgets({
      ...widgets,
      [event.target.name]: event.target.checked,
    });
  };
  
  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as string;
    setSelectedYear(newYear);
    updateChartData(newYear, selectedPeriod);
  };
  
  const handlePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newPeriod = event.target.value as string;
    setSelectedPeriod(newPeriod);
    updateChartData(selectedYear, newPeriod);
  };
  
  const updateChartData = (year: string, period: string) => {
    let updatedData;
    let updatedAmount;
  
    if (year === "2024" && period === "15 días") {
      updatedData = {
        labels: ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
          {
            label: "Ventas 2024",
            data: [700, 800, 750, 900, 850, 950],
            backgroundColor: "rgba(38, 102, 207, 0.7)",
            borderColor: "#2666CF",
            borderWidth: 1,
          },
          {
            label: "Ventas 2023",
            data: [650, 700, 680, 800, 750, 900],
            backgroundColor: "rgba(26, 26, 64, 0.7)",
            borderColor: "#1A1A40",
            borderWidth: 1,
          },
        ],
      };
      updatedAmount = "€1,200.00";
    } else if (year === "2023" && period === "15 días") {
      updatedData = {
        labels: ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
          {
            label: "Ventas 2024",
            data: [600, 700, 650, 800, 750, 850],
            backgroundColor: "rgba(38, 102, 207, 0.7)",
            borderColor: "#2666CF",
            borderWidth: 1,
          },
          {
            label: "Ventas 2023",
            data: [550, 600, 580, 700, 650, 800],
            backgroundColor: "rgba(26, 26, 64, 0.7)",
            borderColor: "#1A1A40",
            borderWidth: 1,
          },
        ],
      };
      updatedAmount = "€900.00";
    } else {
      updatedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Sales 2024",
            data: [500, 400, 600, 700, 800, 900, 1000],
            backgroundColor: "rgba(38, 102, 207, 0.7)",
            borderColor: "#2666CF",
            borderWidth: 1,
          },
          {
            label: "Sales 2023",
            data: [450, 300, 500, 600, 700, 800, 950],
            backgroundColor: "rgba(26, 26, 64, 0.7)",
            borderColor: "#1A1A40",
            borderWidth: 1,
          },
        ],
      };
      updatedAmount = "€0,00";
    }
  
    setAmount(updatedAmount);
    setChartData(updatedData);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };
  
  // Campos obligatorios
  const requiredFields = [];
  
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = `${t(`dashboard.${field}`)} es requerido`;
      }
    });
  
    
  
    
  
    return errors;
  };
  
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setFormErrors(formValidationErrors);
      return;
    }
  
    if (!agentId) {
      console.error("UserId no disponible. El usuario no ha iniciado sesión correctamente.");
      return;
    }

    // Convertimos userType a contactProfile
    let contactProfile = 0;
    if (formData.userType === "freelancer") {
      contactProfile = 1;
    } else if (formData.userType === "company") {
      contactProfile = 2;
    }

    // Construimos el payload
    const contactData: any = {
      userId: agentId,
      contactId: contactId,
      contactProfile, // Usamos contactProfile en lugar de userType
      name: formData.name,
      nie: formData.nie,
      address: formData.address,
      province: formData.province,
      country: formData.country,
      city: formData.city,
      postalCode: formData.postalCode,
      email: formData.email,
      phone: formData.phone,
      phone1: formData.phone1 || "",
      website: formData.website,
      vatIdentification: formData.vatIdentification || "",
      salesTax: formData.salesTax || 0,
      equivalenceSurcharge: formData.equivalenceSurcharge || 0,
      shoppingTax: formData.shoppingTax || 0,
      paymentDay: formData.paymentDay || 0,
      tags: formData.tags || "",
      vatType: formData.vatType || "",
      internalReference: formData.internalReference || "",
      language: formData.language || "",
      currency: formData.currency || "",
      paymentMethod: formData.paymentMethod || "",
      paymentExpirationDays: formData.paymentExpirationDays || "",
      paymentExpirationDay: formData.paymentExpirationDay || "",
      rate: formData.rate || "",
      discount: formData.discount || "",
      swift: formData.swift || "",
      iban: formData.iban || "",
      commercialName: formData.commercialName || "",
      // Campos adicionales
      skills: formData.skills || "",
      experience: formData.experience || "",
      companyName: formData.companyName || "",
      companySize: formData.companySize || "",
      // Dirección de envío
      shippingAddress: [
        {
          direction: formData.shippingAddress,
          city: formData.shippingCity,
          postalCode: formData.shippingPostalCode,
          province: formData.shippingProvince,
          country: formData.shippingCountry,
        },
      ],
    };
    
    try {
      let response;
      if (hasContact && contactId) {
        response = await ContactService.updateContact(contactData, token);
        console.log("Contacto actualizado exitosamente.");
      } else {
        response = await ContactService.createContact(contactData, token);
        console.log("Contacto creado exitosamente.");
      }
  
      if (response && response.data) {
        const updatedContact = response.data as any;
        // Actualizamos formData en el estado local con la respuesta
        setFormData({
          ...formData,
          name: updatedContact.name || formData.name,
          email: updatedContact.email || formData.email,
          country: updatedContact.country || formData.country,
          city: updatedContact.city || formData.city,
          // Convertimos contactProfile de nuevo a userType si lo deseas
          userType: updatedContact.contactProfile === 1 
                    ? "freelancer" 
                    : updatedContact.contactProfile === 2 
                    ? "company" 
                    : "",
          phone: updatedContact.phone || formData.phone,
          address: updatedContact.address || formData.address,
          shippingAddress: updatedContact.shippingAddress?.[0]?.direction || formData.shippingAddress,
          shippingCity: updatedContact.shippingAddress?.[0]?.city || formData.shippingCity,
          shippingProvince: updatedContact.shippingAddress?.[0]?.province || formData.shippingProvince,
          shippingPostalCode: updatedContact.shippingAddress?.[0]?.postalCode || formData.shippingPostalCode,
          shippingCountry: updatedContact.shippingAddress?.[0]?.country || formData.shippingCountry,
          postalCode: updatedContact.postalCode || formData.postalCode,
          nie: updatedContact.nie || formData.nie,
          commercialName: updatedContact.commercialName || formData.commercialName,
          province: updatedContact.province || formData.province,
          website: updatedContact.website || formData.website,
          contactId: updatedContact.id || formData.contactId,
          userId: updatedContact.userId || formData.userId,
          skills: updatedContact.skills || formData.skills,
          experience: updatedContact.experience || formData.experience,
          companyName: updatedContact.companyName || formData.companyName,
          companySize: updatedContact.companySize || formData.companySize,
        });
        setHasContact(true);
        setRefresh((prev) => !prev);
      }
  
      setOpen(false);
    } catch (error: any) {
      console.error(
        hasContact
          ? "Error actualizando el contacto:"
          : "Error creando el contacto:",
        error
      );
      alert(
        hasContact
          ? "Ocurrió un problema al actualizar el contacto. Por favor, inténtalo de nuevo."
          : "Ocurrió un problema al crear el contacto. Por favor, inténtalo de nuevo."
      );
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales 2024",
        data: [500, 400, 600, 700, 800, 900, 1000],
        backgroundColor: "rgba(38, 102, 207, 0.7)",
        borderColor: "#2666CF",
        borderWidth: 1,
      },
      {
        label: "Sales 2023",
        data: [450, 300, 500, 600, 700, 800, 950],
        backgroundColor: "rgba(26, 26, 64, 0.7)",
        borderColor: "#1A1A40",
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Months",
          color: "#666666",
          font: {
            size: 14,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Amount",
          color: "#666666",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  if (!hydrated) {
    return <div></div>;
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F3F4F6",
      }}
    >
      <UserChecker>
        <Header isMenuOpen={isMenuOpen} />
        <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
          <Box
            component="nav"
            sx={{
              width: isMenuOpen ? "240px" : "70px",
              flexShrink: 0,
              bgcolor: "#1A1A40",
              borderRight: "none",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1201,
              position: "fixed",
              height: "100%",
              transition: "width 0.3s ease",
            }}
          >
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "#F3F4F6",
              p: 3,
              transition: "margin-left 0.3s ease",
              marginLeft: isMenuOpen ? "240px" : "70px",
              maxWidth: "calc(100% - 240px)",
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 }, width: "100%" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "#1A1A40",
                  fontWeight: "600",
                  fontFamily: "Roboto, sans-serif",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                {t("dashboard.title")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  maxWidth: "50%",
                }}
              >
                <Fade in timeout={500}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "linear-gradient(90deg, #2666CF, #6A82FB)",
                      color: "#ffffff",
                      fontWeight: "500",
                      textTransform: "none",
                      padding: "10px 20px",
                      borderRadius: 2,
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      minWidth: "120px",
                    }}
                  >
                    {t("dashboard.newContactRequests")}
                  </Button>
                </Fade>
                <Fade in timeout={1000}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#2666CF",
                      color: "#2666CF",
                      fontWeight: "500",
                      textTransform: "none",
                      borderRadius: 2,
                      padding: "10px 20px",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {t("dashboard.newDocumentsReceived")}
                  </Button>
                </Fade>
                <Zoom in timeout={1500}>
                  <IconButton
                    onClick={handleMenuClick}
                    sx={{
                      background: "linear-gradient(90deg, #2666CF, #6A82FB)",
                      color: "#ffffff",
                      fontWeight: "500",
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                </Zoom>
              </Box>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem>
                  <Checkbox checked={widgets.showVentas} onChange={handleWidgetChange} name="showVentas" />
                  <ListItemText primary="Ventas" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showClientes} onChange={handleWidgetChange} name="showClientes" />
                  <ListItemText primary="Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showImpuestos} onChange={handleWidgetChange} name="showImpuestos" />
                  <ListItemText primary="Impuestos" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showBalance} onChange={handleWidgetChange} name="showBalance" />
                  <ListItemText primary="Balance" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showInvoicesToReceive} onChange={handleWidgetChange} name="showInvoicesToReceive" />
                  <ListItemText primary="Invoices to Receive" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showInvoicesToPay} onChange={handleWidgetChange} name="showInvoicesToPay" />
                  <ListItemText primary="Invoices to Pay" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showComparacionVentas} onChange={handleWidgetChange} name="showComparacionVentas" />
                  <ListItemText primary="Comparación de Ventas" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showFlujoTransacciones} onChange={handleWidgetChange} name="showFlujoTransacciones" />
                  <ListItemText primary="Flujo de Transacciones" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showMejoresClientes} onChange={handleWidgetChange} name="showMejoresClientes" />
                  <ListItemText primary="Mejores Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showProductosVendidos} onChange={handleWidgetChange} name="showProductosVendidos" />
                  <ListItemText primary="Productos Vendidos" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showDevolucionesClientes} onChange={handleWidgetChange} name="showDevolucionesClientes" />
                  <ListItemText primary="Devoluciones de Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox checked={widgets.showClientesConVentas} onChange={handleWidgetChange} name="showClientesConVentas" />
                  <ListItemText primary="Clientes con Ventas" />
                </MenuItem>
              </Menu>
  
              <Grid container spacing={3}>
                {widgets.showVentas && (
                  <Grid item xs={12} md={3}>
                    <Zoom in timeout={500}>
                      <Paper
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                          },
                          height: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "36px",
                              height: "36px",
                              bgcolor: "rgba(38, 102, 207, 0.1)",
                              borderRadius: "8px",
                              mr: 2,
                            }}
                          >
                            <FiShoppingCart style={{ color: "#2666CF", fontSize: "20px" }} />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1A1A40",
                              fontWeight: "500",
                              fontFamily: "Roboto, sans-serif",
                            }}
                          >
                            {t("dashboard.totalSales")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#1A1A40",
                            fontWeight: "700",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          $1,000
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                )}
                {widgets.showClientes && (
                  <Grid item xs={12} md={3}>
                    <Zoom in timeout={700}>
                      <Paper
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                          },
                          height: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "36px",
                              height: "36px",
                              bgcolor: "rgba(70, 130, 180, 0.1)",
                              borderRadius: "8px",
                              mr: 2,
                            }}
                          >
                            <FiDollarSign style={{ color: "#4682B4", fontSize: "20px" }} />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1A1A40",
                              fontWeight: "500",
                              fontFamily: "Roboto, sans-serif",
                            }}
                          >
                            {t("dashboard.totalPurchases")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#1A1A40",
                            fontWeight: "700",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          $2,000
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                )}
                {widgets.showImpuestos && (
                  <Grid item xs={12} md={3}>
                    <Zoom in timeout={900}>
                      <Paper
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                          },
                          height: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "36px",
                              height: "36px",
                              bgcolor: "rgba(50, 205, 50, 0.1)",
                              borderRadius: "8px",
                              mr: 2,
                            }}
                          >
                            <FiTrendingUp style={{ color: "#32CD32", fontSize: "20px" }} />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1A1A40",
                              fontWeight: "500",
                              fontFamily: "Roboto, sans-serif",
                            }}
                          >
                            {t("dashboard.profitThisMonth")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#1A1A40",
                            fontWeight: "700",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          $1,000
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                )}
                {widgets.showBalance && (
                  <Grid item xs={12} md={3}>
                    <Zoom in timeout={1100}>
                      <Paper
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                          },
                          height: "100%",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "36px",
                              height: "36px",
                              bgcolor: "rgba(255, 215, 0, 0.1)",
                              borderRadius: "8px",
                              mr: 2,
                            }}
                          >
                            <FiBarChart2 style={{ color: "#FFD700", fontSize: "20px" }} />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1A1A40",
                              fontWeight: "500",
                              fontFamily: "Roboto, sans-serif",
                            }}
                          >
                            {t("dashboard.balance")}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#1A1A40",
                            fontWeight: "700",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          $10,000
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                )}
                {widgets.showInvoicesToReceive && (
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        bgcolor: "#ffffff",
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "60px",
                          height: "60px",
                          bgcolor: "rgba(0, 255, 0, 0.1)",
                          borderRadius: "12px",
                        }}
                      >
                        <FiFileText style={{ color: "#4CAF50", fontSize: "30px" }} />
                      </Box>
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography variant="h6" sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}>
                          {t("dashboard.invoicesToReceive")}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                              {t("dashboard.current")}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                              {t("dashboard.expired")}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#FF0000", fontWeight: "700" }}>
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                )}
                {widgets.showInvoicesToPay && (
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        bgcolor: "#ffffff",
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "60px",
                          height: "60px",
                          bgcolor: "rgba(255, 0, 0, 0.1)",
                          borderRadius: "12px",
                        }}
                      >
                        <FiCalendar style={{ color: "#F44336", fontSize: "30px" }} />
                      </Box>
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography variant="h6" sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}>
                          {t("dashboard.invoicesToPay")}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                              {t("dashboard.current")}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                              {t("dashboard.expired")}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "#FF0000", fontWeight: "700" }}>
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                )}
                {widgets.showComparacionVentas && (
                  <Grid item xs={12}>
                    <Zoom in timeout={1300}>
                      <Paper
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ffffff",
                          borderRadius: 2,
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                          transition: "0.3s",
                          "&:hover": {
                            transform: "translateY(-7px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#1A1A40",
                              fontWeight: "500",
                              fontFamily: "Roboto, sans-serif",
                            }}
                          >
                            Total de ventas
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Select
                              value={selectedPeriod}
                              sx={{
                                minWidth: "160px",
                                height: "40px",
                                bgcolor: "#F3F4F6",
                                borderRadius: "8px",
                              }}
                            >
                              <MenuItem value="7 días">Últimos 7 días</MenuItem>
                              <MenuItem value="15 días">Últimos 15 días</MenuItem>
                              <MenuItem value="1 mes">Último mes</MenuItem>
                              <MenuItem value="3 meses">Último trimestre</MenuItem>
                              <MenuItem value="6 meses">Últimos 6 meses</MenuItem>
                              <MenuItem value="1 año">Último año</MenuItem>
                            </Select>
                            <Select
                              value={selectedYear}
                              sx={{
                                minWidth: "120px",
                                height: "40px",
                                bgcolor: "#F3F4F6",
                                borderRadius: "8px",
                              }}
                            >
                              <MenuItem value="2024">2024</MenuItem>
                              <MenuItem value="2023">2023</MenuItem>
                            </Select>
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ height: 400, position: "relative" }}>
                          <Bar data={data} options={options} />
                          <Box sx={{ position: "absolute", top: 10, right: 20 }}>
                            <Typography variant="h4" sx={{ color: "#2666CF", fontWeight: "700" }}>
                              {amount}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Zoom>
                  </Grid>
                )}
                {widgets.showFlujoTransacciones && (
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "#ffffff",
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                        },
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#1A1A40",
                            fontWeight: "600",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          Flujo de Transacciones
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Button
                            variant="contained"
                            sx={{
                              background: "linear-gradient(90deg, #2666CF, #6A82FB)",
                              color: "#ffffff",
                              fontWeight: "500",
                              textTransform: "none",
                              borderRadius: 2,
                              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                              minWidth: "120px",
                            }}
                          >
                            Filtrar
                          </Button>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ height: 300, position: "relative" }}>
                        <Chart
                          type="bar"
                          data={{
                            labels: [
                              "1 mar",
                              "14 mar",
                              "27 mar",
                              "9 abr",
                              "22 abr",
                              "5 may",
                              "18 may",
                              "31 may",
                              "13 jun",
                              "26 jun",
                              "9 jul",
                              "22 jul",
                              "4 ago",
                              "17 ago",
                              "31 ago",
                            ],
                            datasets: [
                              {
                                type: "line",
                                label: "Ingresos",
                                data: [
                                  0.1, 0.2, 0.15, 0.3, 0.4, 0.35, 0.45, 0.5,
                                  0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85,
                                ],
                                backgroundColor: "rgba(0, 128, 0, 0.2)",
                                borderColor: "rgba(0, 128, 0, 1)",
                                borderWidth: 2,
                                tension: 0.4,
                                fill: "origin",
                              } as ChartDataset<"line", number[]>,
                              {
                                type: "bar",
                                label: "Egresos",
                                data: [
                                  0.05, 0.1, 0.08, 0.15, 0.2, 0.18, 0.22, 0.25,
                                  0.28, 0.3, 0.33, 0.35, 0.4, 0.42, 0.45,
                                ],
                                backgroundColor: "rgba(255, 0, 0, 0.5)",
                                borderColor: "rgba(255, 0, 0, 1)",
                                borderWidth: 1,
                                barThickness: 8,
                              } as ChartDataset<"bar", number[]>,
                              {
                                type: "line",
                                label: "Beneficio",
                                data: [
                                  0.05, 0.1, 0.07, 0.15, 0.2, 0.17, 0.23, 0.25,
                                  0.27, 0.3, 0.32, 0.35, 0.35, 0.38, 0.4,
                                ],
                                backgroundColor: "rgba(0, 123, 255, 0.2)",
                                borderColor: "rgba(0, 123, 255, 1)",
                                borderWidth: 2,
                                tension: 0.4,
                                borderDash: [5, 5],
                                pointStyle: "rectRounded",
                              } as ChartDataset<"line", number[]>,
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                display: true,
                                position: "top",
                                labels: { usePointStyle: true },
                              },
                              tooltip: {
                                mode: "index" as const,
                                intersect: false,
                                callbacks: {
                                  label: function (tooltipItem: any) {
                                    return ` ${tooltipItem.dataset.label}: €${tooltipItem.formattedValue}`;
                                  },
                                },
                              },
                            },
                            scales: {
                              x: {
                                display: true,
                                title: {
                                  display: true,
                                  text: "Fecha",
                                  color: "#666666",
                                  font: { size: 14 },
                                },
                                grid: { color: "rgba(200, 200, 200, 0.2)" },
                              },
                              y: {
                                display: true,
                                title: {
                                  display: true,
                                  text: "Cantidad (€)",
                                  color: "#666666",
                                  font: { size: 14 },
                                },
                                grid: { color: "rgba(200, 200, 200, 0.2)" },
                                suggestedMin: 0,
                                suggestedMax: 1,
                              },
                            },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: 4,
                          p: 2,
                          bgcolor: "#f7f8fa",
                          borderRadius: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                            Total Ingresos
                          </Typography>
                          <Typography variant="h5" sx={{ color: "#32CD32", fontWeight: "700" }}>
                            €0,00
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            +15% desde el mes pasado
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                            Total Egresos
                          </Typography>
                          <Typography variant="h5" sx={{ color: "#FF0000", fontWeight: "700" }}>
                            €0,00
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            -5% desde el mes pasado
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "500" }}>
                            Beneficio Neto
                          </Typography>
                          <Typography variant="h5" sx={{ color: "#0000FF", fontWeight: "700" }}>
                            €0,00
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            +10% desde el mes pasado
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                )}
                {widgets.showProductosVendidos && (
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                        bgcolor: "#ffffff",
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}>
                        Productos más vendidos
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#888", mb: 2 }}>
                        El total vendido tiene impuestos incluidos.
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                        <FiBarChart2 style={{ color: "#888", fontSize: "50px" }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: "#1A1A40", textAlign: "center" }}>
                        Sin ventas registradas
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Durante este periodo no realizaste venta de productos.
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                {widgets.showMejoresClientes && (
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                        bgcolor: "#ffffff",
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}>
                        Mejores clientes
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#888", mb: 2 }}>
                        El total vendido tiene impuestos incluidos.
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                        <FiBarChart2 style={{ color: "#888", fontSize: "50px" }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: "#1A1A40", textAlign: "center" }}>
                        Sin ventas registradas
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        Durante este periodo no realizaste documentos de ventas.
                      </Typography>
                    </Paper>
                  </Grid>
                )}
                <Grid container spacing={2} sx={{ marginTop: 3 }}>
                  {widgets.showImpuestosEnVenta && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          p: 3,
                          bgcolor: "#ffffff",
                          borderRadius: 3,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}>
                          Impuestos en venta
                        </Typography>
                        <Typography variant="h4" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                          €0,00
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 15,
                            right: 15,
                            bgcolor: "#E5F6FF",
                            borderRadius: "50%",
                            padding: "8px",
                          }}
                        >
                          <FiDollarSign style={{ color: "#00A9F4", fontSize: "24px" }} />
                        </Box>
                        <Box sx={{ mt: 2, width: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Progreso del objetivo
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              height: 10,
                              bgcolor: "#E0E0E0",
                              borderRadius: 5,
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: "50%",
                                height: "100%",
                                bgcolor: "#00A9F4",
                                borderRadius: 5,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                  {widgets.showProductosVendidos && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          p: 3,
                          bgcolor: "#ffffff",
                          borderRadius: 3,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}>
                          Productos vendidos
                        </Typography>
                        <Typography variant="h4" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                          0
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 15,
                            right: 15,
                            bgcolor: "#FFF3E0",
                            borderRadius: "50%",
                            padding: "8px",
                          }}
                        >
                          <FiShoppingCart style={{ color: "#FFA726", fontSize: "24px" }} />
                        </Box>
                        <Box sx={{ mt: 2, width: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#1A1A40", textAlign: "center" }}>
                            Sin ventas registradas
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            Durante este periodo no realizaste venta de productos.
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                  {widgets.showDevolucionesClientes && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          p: 3,
                          bgcolor: "#ffffff",
                          borderRadius: 3,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}>
                          Devoluciones de clientes
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#888", mb: 1 }}>
                          Incluye impuestos
                        </Typography>
                        <Typography variant="h4" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                          €0,00
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 15,
                            right: 15,
                            bgcolor: "#FFEBEE",
                            borderRadius: "50%",
                            padding: "8px",
                          }}
                        >
                          <FiRefreshCcw style={{ color: "#E53935", fontSize: "24px" }} />
                        </Box>
                        <Box sx={{ mt: 2, width: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Tasa de devoluciones
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              height: 10,
                              bgcolor: "#E0E0E0",
                              borderRadius: 5,
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: "10%",
                                height: "100%",
                                bgcolor: "#E53935",
                                borderRadius: 5,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                  {widgets.showClientesConVentas && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          p: 3,
                          bgcolor: "#ffffff",
                          borderRadius: 3,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}>
                          Clientes con ventas
                        </Typography>
                        <Typography variant="h4" sx={{ color: "#1A1A40", fontWeight: "700" }}>
                          0
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 15,
                            right: 15,
                            bgcolor: "#E8F5E9",
                            borderRadius: "50%",
                            padding: "8px",
                          }}
                        >
                          <FiUser style={{ color: "#43A047", fontSize: "24px" }} />
                        </Box>
                        <Box sx={{ mt: 2, width: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Crecimiento de clientes
                          </Typography>
                          <Box
                            sx={{
                              position: "relative",
                              height: 10,
                              bgcolor: "#E0E0E0",
                              borderRadius: 5,
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: "30%",
                                height: "100%",
                                bgcolor: "#43A047",
                                borderRadius: 5,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
  
        <UserInfoDialog
          open={open}
          handleClose={handleClose}
          hasContact={hasContact}
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          loading={loadingState}
        />
      </UserChecker>
    </Box>
  );
};
  
export default Dashboard;
