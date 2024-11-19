import { useState } from "react";
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
import { ChartOptions } from "chart.js";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import useAuthStore from '../../../store/useAuthStore';
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
  const [open, setOpen] = useState(true);
  const [userType, setUserType] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedPeriod, setSelectedPeriod] = useState("7 días");
  const [amount, setAmount] = useState("€0,00");
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(initialChartData);
  const { agentId, token } = useAuthStore();

  // Estado para controlar la visibilidad de todos los widgets
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWidgetChange = (event) => {
    setWidgets({
      ...widgets,
      [event.target.name]: event.target.checked,
    });
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    updateChartData(newYear, selectedPeriod);
  };

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    updateChartData(selectedYear, newPeriod);
  };

  const updateChartData = (year, period) => {
    let updatedData;
    let updatedAmount;

    if (year === "2024" && period === "15 días") {
      updatedData = {
        /* New dataset for 2024 and last 15 days */
      };
      updatedAmount = "€1,200.00";
    } else if (year === "2023" && period === "15 días") {
      updatedData = {
        /* New dataset for 2023 and last 15 days */
      };
      updatedAmount = "€900.00";
    } else {
      updatedData = {
        /* Default dataset */
      };
      updatedAmount = "€0,00";
    }

    setAmount(updatedAmount);
    setChartData(updatedData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formValidationErrors = validateForm();
    if (Object.keys(formValidationErrors).length > 0) {
      setFormErrors(formValidationErrors); // Si hay errores, se establecen en el estado
      return;
    }
  
    
  
    if (!agentId) {
      console.error('UserId no disponible. El usuario no ha iniciado sesión correctamente.');
      return;
    }
  
    const contactData = {
      contactType: 1, // Tipo de contacto
      name: formData.name,
      address: formData.address,
      country: formData.country,
      city: formData.city,
      postalCode: formData.postalCode,
      email: formData.email,
      phone: formData.phone,
    };
  
    try {
      await ContactService.createContact(contactData, token, agentId); // Pasa el token y el agentId como argumentos
      setOpen(false); // Cierra el modal o muestra un mensaje de éxito
    } catch (error) {
      console.error('Error creando el contacto:', error);
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
        position: "top",
      },
      tooltip: {
        mode: "index",
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

  // Define the interface for formErrors
interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  city?: string;
  phone?: string;
  [key: string]: string | undefined;
}

// Estado del formulario para gestionar los datos
const [formData, setFormData] = useState({
  name: "",
  email: "",
  country: "",
  city: "",
  userType: '',
  phone: "",
  address: "",
  postalCode: "",
  nif: "",
  commercialName: "",
  province: "",
  mobile: "",
  website: "",
});

// Initialize formErrors with the FormErrors interface
const [formErrors, setFormErrors] = useState<FormErrors>({});

// Campos obligatorios
const requiredFields = ["name", "email", "country", "city", "phone"];

const validateForm = (): FormErrors => {
  const errors: FormErrors = {};
  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `${field} es requerido`;
    }
  });
  return errors;
};


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  



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
            <Container maxWidth="lg">
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
                      bgcolor: "#2666CF",
                      color: "#ffffff",
                      fontWeight: "500",
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      padding: "10px 20px",
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
                      bgcolor: "#2666CF",
                      color: "#fff",
                      borderRadius: 2,
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                </Zoom>
              </Box>

              {/* Menú desplegable para la selección de widgets */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem>
                  <Checkbox
                    checked={widgets.showVentas}
                    onChange={handleWidgetChange}
                    name="showVentas"
                  />
                  <ListItemText primary="Ventas" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showClientes}
                    onChange={handleWidgetChange}
                    name="showClientes"
                  />
                  <ListItemText primary="Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showImpuestos}
                    onChange={handleWidgetChange}
                    name="showImpuestos"
                  />
                  <ListItemText primary="Impuestos" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showBalance}
                    onChange={handleWidgetChange}
                    name="showBalance"
                  />
                  <ListItemText primary="Balance" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showInvoicesToReceive}
                    onChange={handleWidgetChange}
                    name="showInvoicesToReceive"
                  />
                  <ListItemText primary="Invoices to Receive" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showInvoicesToPay}
                    onChange={handleWidgetChange}
                    name="showInvoicesToPay"
                  />
                  <ListItemText primary="Invoices to Pay" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showComparacionVentas}
                    onChange={handleWidgetChange}
                    name="showComparacionVentas"
                  />
                  <ListItemText primary="Comparación de Ventas" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showFlujoTransacciones}
                    onChange={handleWidgetChange}
                    name="showFlujoTransacciones"
                  />
                  <ListItemText primary="Flujo de Transacciones" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showMejoresClientes}
                    onChange={handleWidgetChange}
                    name="showMejoresClientes"
                  />
                  <ListItemText primary="Mejores Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showProductosVendidos}
                    onChange={handleWidgetChange}
                    name="showProductosVendidos"
                  />
                  <ListItemText primary="Productos Vendidos" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showDevolucionesClientes}
                    onChange={handleWidgetChange}
                    name="showDevolucionesClientes"
                  />
                  <ListItemText primary="Devoluciones de Clientes" />
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    checked={widgets.showClientesConVentas}
                    onChange={handleWidgetChange}
                    name="showClientesConVentas"
                  />
                  <ListItemText primary="Clientes con Ventas" />
                </MenuItem>
              </Menu>

              <Grid container spacing={3}>
                {/* Aquí comenzarán los widgets seleccionables */}
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
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
                            <FiShoppingCart
                              style={{ color: "#2666CF", fontSize: "20px" }}
                            />
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
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
                            <FiDollarSign
                              style={{ color: "#4682B4", fontSize: "20px" }}
                            />
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
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
                            <FiTrendingUp
                              style={{ color: "#32CD32", fontSize: "20px" }}
                            />
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
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
                            <FiBarChart2
                              style={{ color: "#FFD700", fontSize: "20px" }}
                            />
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
                        <FiFileText
                          style={{ color: "#4CAF50", fontSize: "30px" }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}
                        >
                          {t("dashboard.invoicesToReceive")}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#1A1A40", fontWeight: "500" }}
                            >
                              {t("dashboard.current")}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "#1A1A40", fontWeight: "700" }}
                            >
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#1A1A40", fontWeight: "500" }}
                            >
                              {t("dashboard.expired")}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "#FF0000", fontWeight: "700" }}
                            >
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
                        <FiCalendar
                          style={{ color: "#F44336", fontSize: "30px" }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1, ml: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}
                        >
                          {t("dashboard.invoicesToPay")}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#1A1A40", fontWeight: "500" }}
                            >
                              {t("dashboard.current")}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "#1A1A40", fontWeight: "700" }}
                            >
                              €0,00
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                              0 {t("dashboard.documents")}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "#1A1A40", fontWeight: "500" }}
                            >
                              {t("dashboard.expired")}
                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{ color: "#FF0000", fontWeight: "700" }}
                            >
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
                              onChange={handlePeriodChange}
                              sx={{
                                minWidth: "160px",
                                height: "40px",
                                bgcolor: "#F3F4F6",
                                borderRadius: "8px",
                              }}
                            >
                              <MenuItem value="7 días">Últimos 7 días</MenuItem>
                              <MenuItem value="15 días">
                                Últimos 15 días
                              </MenuItem>
                              <MenuItem value="1 mes">Último mes</MenuItem>
                              <MenuItem value="3 meses">
                                Último trimestre
                              </MenuItem>
                              <MenuItem value="6 meses">
                                Últimos 6 meses
                              </MenuItem>
                              <MenuItem value="1 año">Último año</MenuItem>
                            </Select>
                            <Select
                              value={selectedYear}
                              onChange={handleYearChange}
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
                          <Bar data={data} />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 20,
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ color: "#2666CF", fontWeight: "700" }}
                            >
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
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: "#2666CF",
                              color: "#fff",
                              textTransform: "none",
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
                                labels: {
                                  usePointStyle: true,
                                },
                              },
                              tooltip: {
                                mode: "index",
                                intersect: false,
                                callbacks: {
                                  label: function (tooltipItem) {
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
                                  font: {
                                    size: 14,
                                  },
                                },
                                grid: {
                                  color: "rgba(200, 200, 200, 0.2)",
                                },
                              },
                              y: {
                                display: true,
                                title: {
                                  display: true,
                                  text: "Cantidad (€)",
                                  color: "#666666",
                                  font: {
                                    size: 14,
                                  },
                                },
                                grid: {
                                  color: "rgba(200, 200, 200, 0.2)",
                                },
                                suggestedMin: 0,
                                suggestedMax: 1,
                              },
                            },
                          }}
                        />
                      </Box>

                      {/* Contenedor de estadísticas y métricas adicionales */}
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
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#1A1A40", fontWeight: "500" }}
                          >
                            Total Ingresos
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: "#32CD32", fontWeight: "700" }}
                          >
                            €0,00
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            +15% desde el mes pasado
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#1A1A40", fontWeight: "500" }}
                          >
                            Total Egresos
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: "#FF0000", fontWeight: "700" }}
                          >
                            €0,00
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            -5% desde el mes pasado
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#1A1A40", fontWeight: "500" }}
                          >
                            Beneficio Neto
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: "#0000FF", fontWeight: "700" }}
                          >
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
                      <Typography
                        variant="h6"
                        sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}
                      >
                        Productos más vendidos
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#888", mb: 2 }}>
                        El total vendido tiene impuestos incluidos.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <FiBarChart2
                          style={{ color: "#888", fontSize: "50px" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#1A1A40", textAlign: "center" }}
                      >
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
                      <Typography
                        variant="h6"
                        sx={{ color: "#1A1A40", fontWeight: "700", mb: 1 }}
                      >
                        Mejores clientes
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#888", mb: 2 }}>
                        El total vendido tiene impuestos incluidos.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <FiBarChart2
                          style={{ color: "#888", fontSize: "50px" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#1A1A40", textAlign: "center" }}
                      >
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
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}
                        >
                          Impuestos en venta
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#1A1A40", fontWeight: "700" }}
                        >
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
                          <FiDollarSign
                            style={{ color: "#00A9F4", fontSize: "24px" }}
                          />
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
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}
                        >
                          Productos vendidos
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#1A1A40", fontWeight: "700" }}
                        >
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
                          <FiShoppingCart
                            style={{ color: "#FFA726", fontSize: "24px" }}
                          />
                        </Box>
                        <Box sx={{ mt: 2, width: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Nivel de ventas
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
                                width: "20%",
                                height: "100%",
                                bgcolor: "#FFA726",
                                borderRadius: 5,
                              }}
                            ></Box>
                          </Box>
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
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}
                        >
                          Devoluciones de clientes
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#888", mb: 1 }}
                        >
                          Incluye impuestos
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#1A1A40", fontWeight: "700" }}
                        >
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
                          <FiRefreshCcw
                            style={{ color: "#E53935", fontSize: "24px" }}
                          />
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
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                          },
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#1A1A40", fontWeight: "600", mb: 1 }}
                        >
                          Clientes con ventas
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "#1A1A40", fontWeight: "700" }}
                        >
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
                          <FiUser
                            style={{ color: "#43A047", fontSize: "24px" }}
                          />
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

        {/* Dialog para completar información del usuario */}
        {/* Dialog para completar información del usuario */}
<Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
  <DialogTitle sx={{ fontWeight: "700", fontFamily: "Roboto, sans-serif" }}>
    {t("dashboard.completeYourInfo")}
  </DialogTitle>
  <DialogContent>
    <DialogContentText sx={{ fontWeight: "400", fontFamily: "Roboto, sans-serif" }}>
      {t("dashboard.completeInfoDescription")}
    </DialogContentText>
    <Box
      component="form"
      onSubmit={handleFormSubmit} // Función actualizada para la validación
      noValidate
      sx={{ mt: 1 }}
    >
      {/* Contenedor principal para Perfil y Editar perfil */}
      <Grid container spacing={4}>
        {/* Sección 1: Perfil */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Perfil
            </Typography>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                >
                  {!formData.name ? 'NA' : formData.name.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  {formData.name || 'Nombre no disponible'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formData.email || 'Email no disponible'}
                </Typography>
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Cambiar foto
                </Button>
                <Button
                  variant="text"
                  color="error"
                  fullWidth
                >
                  Eliminar cuenta
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Sección 2: Editar perfil */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Editar perfil
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.name')}
                  name="name"
                  fullWidth
                  variant="outlined"
                  value={formData.name || ''}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.email')}
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email || ''}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email || ''}
                />
              </Grid>

              {/* Nueva Sección: Tipo de usuario */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.userType')}
                  name="userType"
                  fullWidth
                  variant="outlined"
                  select
                  value={formData.userType || ''}
                  onChange={handleChange}
                  error={!!formErrors.userType}
                  helperText={formErrors.userType || ''}
                >
                  <MenuItem value="">Seleccionar tipo</MenuItem>
                  <MenuItem value="freelancer">Freelancer</MenuItem>
                  <MenuItem value="company">Empresa</MenuItem>
                </TextField>
              </Grid>
              {/* Fin de la nueva sección */}

              {/* Campos comunes */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.phone')}
                  name="phone"
                  fullWidth
                  variant="outlined"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.mobile')}
                  name="mobile"
                  fullWidth
                  variant="outlined"
                  value={formData.mobile || ''}
                  onChange={handleChange}
                  error={!!formErrors.mobile}
                  helperText={formErrors.mobile || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('dashboard.website')}
                  name="website"
                  fullWidth
                  variant="outlined"
                  value={formData.website || ''}
                  onChange={handleChange}
                  error={!!formErrors.website}
                  helperText={formErrors.website || ''}
                />
              </Grid>

              {/* Campos específicos para Freelancer */}
              {formData.userType === 'freelancer' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('dashboard.skills')}
                      name="skills"
                      fullWidth
                      variant="outlined"
                      value={''}
                      onChange={handleChange}
                      error={!!formErrors.skills}
                      helperText={formErrors.skills || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('dashboard.experience')}
                      name="experience"
                      fullWidth
                      variant="outlined"
                      value={''}
                      onChange={handleChange}
                      error={!!formErrors.experience}
                      helperText={formErrors.experience || ''}
                    />
                  </Grid>
                </>
              )}

              {/* Campos específicos para Empresa */}
              {formData.userType === 'company' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('dashboard.companyName')}
                      name="companyName"
                      fullWidth
                      variant="outlined"
                      value={''}
                      onChange={handleChange}
                      error={!!formErrors.companyName}
                      helperText={formErrors.companyName || ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('dashboard.companySize')}
                      name="companySize"
                      fullWidth
                      variant="outlined"
                      select
                      value={''}
                      onChange={handleChange}
                      error={!!formErrors.companySize}
                      helperText={formErrors.companySize || ''}
                    >
                      <MenuItem value="">Seleccionar tamaño</MenuItem>
                      <MenuItem value="1-10">1-10 empleados</MenuItem>
                      <MenuItem value="11-50">11-50 empleados</MenuItem>
                      <MenuItem value="51-200">51-200 empleados</MenuItem>
                      <MenuItem value="201+">201+ empleados</MenuItem>
                    </TextField>
                  </Grid>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
              >
                Guardar cambios
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Cambiar contraseña
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Sección 3: Datos fiscales */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Datos fiscales
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.nif')}
              name="nif"
              fullWidth
              variant="outlined"
              value={formData.nif || ''}
              onChange={handleChange}
              error={!!formErrors.nif}
              helperText={formErrors.nif || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.commercialName')}
              name="commercialName"
              fullWidth
              variant="outlined"
              value={formData.commercialName || ''}
              onChange={handleChange}
              error={!!formErrors.commercialName}
              helperText={formErrors.commercialName || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 2 }}>
              Dirección fiscal:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.fiscalAddress')}
              name="address"
              fullWidth
              variant="outlined"
              value={formData.address || ''}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.city')}
              name="city"
              fullWidth
              variant="outlined"
              value={formData.city || ''}
              onChange={handleChange}
              error={!!formErrors.city}
              helperText={formErrors.city || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.province')}
              name="province"
              fullWidth
              variant="outlined"
              select
              value={formData.province || ''}
              onChange={handleChange}
              error={!!formErrors.province}
              helperText={formErrors.province || ''}
            >
              <MenuItem value="">Seleccionar provincia</MenuItem>
              <MenuItem value="provincia1">Provincia 1</MenuItem>
              <MenuItem value="provincia2">Provincia 2</MenuItem>
              {/* Añade más opciones según sea necesario */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.postalCode')}
              name="postalCode"
              fullWidth
              variant="outlined"
              value={formData.postalCode || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.country')}
              name="country"
              fullWidth
              variant="outlined"
              select
              value={formData.country || ''}
              onChange={handleChange}
              error={!!formErrors.country}
              helperText={formErrors.country || ''}
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              <MenuItem value="es">España</MenuItem>
              <MenuItem value="fr">Francia</MenuItem>
              {/* Añade más opciones según sea necesario */}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Sección 4: Datos de contacto */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Datos de contacto
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.phone')}
              name="phone"
              fullWidth
              variant="outlined"
              value={formData.phone || ''}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.email')}
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email || ''}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.mobile')}
              name="mobile"
              fullWidth
              variant="outlined"
              value={formData.mobile || ''}
              onChange={handleChange}
              error={!!formErrors.mobile}
              helperText={formErrors.mobile || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.website')}
              name="website"
              fullWidth
              variant="outlined"
              value={formData.website || ''}
              onChange={handleChange}
              error={!!formErrors.website}
              helperText={formErrors.website || ''}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Sección 5: Dirección de envío */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Dirección de envío
        </Typography>
        <Grid container spacing={2}>
          {/* Reutilizamos los mismos campos para Dirección de envío */}
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.fiscalAddress')} // Puedes cambiar la etiqueta si es necesario
              name="address"
              fullWidth
              variant="outlined"
              value={formData.address || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('dashboard.city')} // Puedes cambiar la etiqueta si es necesario
              name="city"
              fullWidth
              variant="outlined"
              value={formData.city || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.province')} // Puedes cambiar la etiqueta si es necesario
              name="province"
              fullWidth
              variant="outlined"
              select
              value={formData.province || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            >
              <MenuItem value="">Seleccionar provincia</MenuItem>
              <MenuItem value="provincia1">Provincia 1</MenuItem>
              <MenuItem value="provincia2">Provincia 2</MenuItem>
              {/* Añade más opciones según sea necesario */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.postalCode')} // Puedes cambiar la etiqueta si es necesario
              name="postalCode"
              fullWidth
              variant="outlined"
              value={formData.postalCode || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={t('dashboard.country')} // Puedes cambiar la etiqueta si es necesario
              name="country"
              fullWidth
              variant="outlined"
              select
              value={formData.country || ''}
              onChange={handleChange}
              // No agregar error y helperText para evitar duplicaciones
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              <MenuItem value="es">España</MenuItem>
              <MenuItem value="fr">Francia</MenuItem>
              {/* Añade más opciones según sea necesario */}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
          >
            Añadir dirección de envío
          </Button>
        </Box>
      </Box>

      {/* Botones de acciones del diálogo */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "#2666CF",
            fontWeight: "500",
            textTransform: "none",
            bgcolor: "#ffffff",
            border: "1px solid #2666CF",
            borderRadius: 2,
          }}
        >
          {t("dashboard.fillOutLater")}
        </Button>
        <Button
          type="submit"
          sx={{
            color: "#ffffff",
            fontWeight: "500",
            textTransform: "none",
            bgcolor: "#2666CF",
            borderRadius: 2,
          }}
        >
          {t("dashboard.save")}
        </Button>
      </Box>
    </Box>
  </DialogContent>
</Dialog>




</UserChecker>
</Box>
);
};


export default Dashboard;
