// components/ContactDetailsDrawer.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import MapIcon from "@mui/icons-material/Map";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Bar } from "react-chartjs-2";
import { Contact } from "../../../types/Contact";
import { LinkedContact } from "../../../types/LinkedContact";

export type EditClientData = {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  direccion: string;
  codigoPostal: string;
  poblacion: string;
  provincia: string;
  pais: string;
};

interface ContactDetailsDrawerProps {
  selectedContact: Contact | null;
  isDrawerOpen: boolean;
  isDrawerExpanded: boolean;
  setIsDrawerExpanded: (value: boolean) => void;
  onCloseDrawer: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editData: Contact | null;
  setEditData: (contact: Contact | null) => void;
  isEditingClient: boolean;
  setIsEditingClient: (value: boolean) => void;
  editClientData: {
    nombre: string;
    nif: string;
    telefono: string;
    email: string;
    direccion: string;
    codigoPostal: string;
    poblacion: string;
    provincia: string;
    pais: string;
  };
  setEditClientData: (data: EditClientData) => void;
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  linkedContacts: LinkedContact[];
  onLinkContact: (personId: string) => void; // Actualizado: ahora recibe string
  onUnlinkContact: (linkedContactId: string) => void;
  onPortalClick: () => void;
  handleSaveContact: (contact: Contact) => void;
  handleOpenDialog: () => void;
}

const salesData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: "Ventas (€)",
      data: [2500, 1200, 1500, 2000, 3000, 2500, 2800, 3200, 1900, 2100, 2700, 2900],
      backgroundColor: "#2666CF",
    },
  ],
};

const purchasesData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: "Compras (€)",
      data: [800, 600, 750, 900, 1000, 850, 950, 1100, 700, 650, 900, 1000],
      backgroundColor: "#F44336",
    },
  ],
};

const ContactDetailsDrawer: React.FC<ContactDetailsDrawerProps> = ({
  selectedContact,
  isDrawerOpen,
  isDrawerExpanded,
  setIsDrawerExpanded,
  onCloseDrawer,
  isEditing,
  setIsEditing,
  editData,
  setEditData,
  isEditingClient,
  setIsEditingClient,
  editClientData,
  setEditClientData,
  selectedTab,
  setSelectedTab,
  linkedContacts,
  onLinkContact,
  onUnlinkContact,
  onPortalClick,
  handleSaveContact,
  handleOpenDialog,
}) => {
  if (!selectedContact) return null;

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={onCloseDrawer}
      sx={{
        zIndex: 1300,
        width: isDrawerExpanded ? "1300px" : "500px",
        transition: "width 0.3s ease",
        marginTop: "64px",
        height: "calc(100% - 64px)",
      }}
      PaperProps={{
        style: {
          width: isDrawerExpanded ? "1300px" : "500px",
          transition: "width 0.3s ease",
        },
      }}
    >
      {!isDrawerExpanded ? (
        <Box sx={{ p: 2, overflowY: "auto", height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                bgcolor: "#F44336",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                mr: 2,
              }}
            >
              {selectedContact.nombre?.[0]}
              {selectedContact.nombre?.split(" ")[1]?.[0]}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ margin: 0, fontWeight: "bold" }}>
                {selectedContact.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: "#8A8A8A" }}>
                {selectedContact.tipoContacto}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button
                startIcon={<ArrowForwardIcon />}
                onClick={() => setIsDrawerExpanded(true)}
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
                Más
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <IconButton>
              <EmailIcon />
            </IconButton>
            <IconButton>
              <PhoneIcon />
            </IconButton>
            <IconButton>
              <LanguageIcon />
            </IconButton>
            <IconButton>
              <MapIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Información de Contacto
              </Typography>
              {isEditing ? (
                <Box>
                  <Button
                    variant="text"
                    onClick={() => {
                      setEditData(selectedContact);
                      setIsEditing(false);
                    }}
                    sx={{ textTransform: "none", color: "#2666CF", mr: 1 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setEditData(selectedContact);
                      setIsEditing(false);
                    }}
                    sx={{ textTransform: "none", color: "#B00020" }}
                  >
                    Cancelar
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="text"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{ textTransform: "none", color: "#2666CF" }}
                >
                  Editar
                </Button>
              )}
            </Box>
            {isEditing && editData ? (
              <>
                <TextField
                  label="Nombre"
                  value={editData.nombre}
                  onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Nif"
                  value={editData.nif}
                  onChange={(e) => setEditData({ ...editData, nif: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Dirección"
                  value={editData.direccion}
                  onChange={(e) => setEditData({ ...editData, direccion: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Teléfono"
                  value={editData.telefono}
                  onChange={(e) => setEditData({ ...editData, telefono: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  fullWidth
                  sx={{ mb: 1 }}
                />
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Nombre:</strong> {selectedContact.nombre}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Nif:</strong> {selectedContact.nif}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Dirección:</strong> {selectedContact.direccion}
                </Typography>
                <Typography variant="body2">
                  <strong>Teléfono:</strong>{" "}
                  <a href={`tel:${selectedContact.telefono}`} style={{ color: "#2666CF" }}>
                    {selectedContact.telefono}
                  </a>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedContact.email}`} style={{ color: "#2666CF" }}>
                    {selectedContact.email}
                  </a>
                </Typography>
              </>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Nuevo Presupuesto
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Nuevo Pedido
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Nuevo Albarán
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Nueva Factura
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Añadir Nota
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Nota
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Presupuesto
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
              Factura
            </Button>
            <Button variant="outlined" sx={{ textTransform: "none" }} onClick={onPortalClick}>
              Portal Cliente
            </Button>
          </Box>

          <Button variant="outlined" sx={{ textTransform: "none", mb: 3 }} onClick={handleOpenDialog}>
            Relacionar persona
          </Button>
          

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
              Ventas
            </Typography>
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                p: 1,
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%" }}>
                <Typography variant="body2" sx={{ color: "#4A4A4A", fontSize: "0.875rem" }}>
                  Ventas
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000000", fontSize: "1rem" }}>
                  27.682,56 €
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    p: 0,
                    mt: 0.5,
                    textTransform: "none",
                    color: "#2666CF",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem" }} />}
                  onClick={() => {}}
                >
                  8 facturas
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%", textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem" }}>
                  Promedio/venta
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  3.460,32 €
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%", textAlign: "right" }}>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem" }}>
                  Frec. media
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  0 días
                </Typography>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem", mt: 1 }}>
                  Pend. cobro
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  2.514,87 €
                </Typography>
              </Box>
            </Box>
            <Bar data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
              Compras
            </Typography>
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                p: 1,
                borderRadius: 1,
                boxShadow: 1,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%" }}>
                <Typography variant="body2" sx={{ color: "#4A4A4A", fontSize: "0.875rem" }}>
                  Compras
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000000", fontSize: "1rem" }}>
                  15.234,89 €
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    p: 0,
                    mt: 0.5,
                    textTransform: "none",
                    color: "#2666CF",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "1rem" }} />}
                  onClick={() => {}}
                >
                  5 pedidos
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%", textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem" }}>
                  Promedio/compra
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  3.046,78 €
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 30%", textAlign: "right" }}>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem" }}>
                  Frec. media
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  5 días
                </Typography>
                <Typography variant="body2" sx={{ color: "#B0B0B0", fontSize: "0.75rem", mt: 1 }}>
                  Pend. pago
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium", color: "#000000", fontSize: "0.875rem" }}>
                  1.200,50 €
                </Typography>
              </Box>
            </Box>
            <Bar data={purchasesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 3, overflowY: "auto", height: "100%", bgcolor: "#F9F9F9" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1, color: "#333" }}>
              {selectedContact.nombre || "Nombre del Contacto"}
            </Typography>
            <Button
              startIcon={<ArrowForwardIcon />}
              onClick={() => setIsDrawerExpanded(false)}
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
              Menos
            </Button>
          </Box>

          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              mb: 3,
              ".MuiTabs-indicator": { bgcolor: "#2666CF" },
              ".MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                color: "#666",
                "&.Mui-selected": { color: "#2666CF" },
              },
            }}
          >
            <Tab label="Resumen" />
            <Tab label="Facturas" />
            <Tab label="Albaranes" />
            <Tab label="Pedidos" />
            <Tab label="Pagos" />
            <Tab label="Notas" />
          </Tabs>

          {selectedTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2666CF" }}>
                      Información del Cliente
                    </Typography>
                    {isEditingClient ? (
                      <Box>
                        <Button
                          variant="text"
                          onClick={() => {
                            handleSaveContact({ ...selectedContact, ...editClientData });
                            setIsEditingClient(false);
                          }}
                          sx={{ textTransform: "none", color: "#2666CF", mr: 1 }}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => {
                            setEditClientData({
                              nombre: selectedContact?.nombre || "",
                              nif: selectedContact?.nif || "",
                              telefono: selectedContact?.telefono || "",
                              email: selectedContact?.email || "",
                              direccion: selectedContact?.direccion || "",
                              codigoPostal: selectedContact?.codigoPostal || "",
                              poblacion: selectedContact?.poblacion || "",
                              provincia: selectedContact?.provincia || "",
                              pais: selectedContact?.pais || "",
                            });
                            setIsEditingClient(false);
                          }}
                          sx={{ textTransform: "none", color: "#B00020" }}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="text"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEditingClient(true)}
                        sx={{ textTransform: "none", color: "#2666CF" }}
                      >
                        Editar
                      </Button>
                    )}
                  </Box>

                  {isEditingClient ? (
                    <>
                      <TextField
                        label="Nombre"
                        name="nombre"
                        value={editClientData.nombre}
                        onChange={(e) => setEditClientData({ ...editClientData, nombre: e.target.value })}
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="NIF"
                        name="nif"
                        value={editClientData.nif}
                        onChange={(e) => setEditClientData({ ...editClientData, nif: e.target.value })}
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Teléfono"
                        name="telefono"
                        value={editClientData.telefono}
                        onChange={(e) => setEditClientData({ ...editClientData, telefono: e.target.value })}
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        value={editClientData.email}
                        onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Dirección:</strong>
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            label="Dirección"
                            name="direccion"
                            value={editClientData.direccion}
                            onChange={(e) => setEditClientData({ ...editClientData, direccion: e.target.value })}
                            fullWidth
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Código Postal"
                            name="codigoPostal"
                            value={editClientData.codigoPostal}
                            onChange={(e) => setEditClientData({ ...editClientData, codigoPostal: e.target.value })}
                            fullWidth
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Población"
                            name="poblacion"
                            value={editClientData.poblacion}
                            onChange={(e) => setEditClientData({ ...editClientData, poblacion: e.target.value })}
                            fullWidth
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Provincia"
                            name="provincia"
                            value={editClientData.provincia}
                            onChange={(e) => setEditClientData({ ...editClientData, provincia: e.target.value })}
                            fullWidth
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="País"
                            name="pais"
                            value={editClientData.pais}
                            onChange={(e) => setEditClientData({ ...editClientData, pais: e.target.value })}
                            fullWidth
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Nombre:</strong> {selectedContact.nombre}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>NIF:</strong> {selectedContact.nif}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Teléfono:</strong>{" "}
                        <a href={`tel:${selectedContact.telefono}`} style={{ color: "#2666CF" }}>
                          {selectedContact.telefono}
                        </a>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Email:</strong>{" "}
                        <a href={`mailto:${selectedContact.email}`} style={{ color: "#2666CF" }}>
                          {selectedContact.email}
                        </a>
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Dirección:</strong>
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="body2">{selectedContact.direccion}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{selectedContact.codigoPostal}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{selectedContact.poblacion}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{selectedContact.provincia}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{selectedContact.pais}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1F4B99" }}>
                      Gráfico de Ventas
                    </Typography>
                    <TextField
                      select
                      size="small"
                      defaultValue="2024"
                      sx={{
                        width: 100,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                        },
                      }}
                    >
                      <MenuItem value="2024">2024</MenuItem>
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2022">2022</MenuItem>
                    </TextField>
                  </Box>
                  <Bar data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#2666CF" }}>
                    Resumen Financiero
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total por vencer:</strong>{" "}
                    <span style={{ color: "#2666CF", fontWeight: "bold" }}>1.345,98 €</span>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#B00020", fontWeight: "bold" }}>
                    <strong>Total vencido por cobrar:</strong> 998,76 €
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total cobrado:</strong> 24.986,34 €
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total vendido:</strong> 27.331,08 €
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#2666CF" }}>
                    Portal Cliente
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderColor: "#2666CF",
                        color: "#2666CF",
                        fontWeight: "bold",
                      }}
                    >
                      Establecer contraseña del portal
                    </Button>
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
                      Ver portal del cliente
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                    bgcolor: "#FFF8DC",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#856404" }}>
                    Notas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    21/09/2024: Entregar los pedidos antes de las 13h que cierran el muelle de carga.
                  </Typography>
                  <Button
                    startIcon={<AddIcon />}
                    sx={{ mt: 1, textTransform: "none", color: "#856404", fontWeight: "bold" }}
                  >
                    + Añadir nota
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
          {selectedTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2666CF" }}>
                    Facturas
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead style={{ backgroundColor: "#003366", color: "#fff" }}>
                        <tr>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Número de Factura</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Fecha</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Cliente</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Total</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px" }}>FA-2023-001</td>
                          <td style={{ padding: "8px" }}>01/01/2023</td>
                          <td style={{ padding: "8px" }}>Cliente A</td>
                          <td style={{ padding: "8px" }}>1,200.00 €</td>
                          <td style={{ padding: "8px", color: "#28A745", fontWeight: "bold" }}>Pagada</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          {selectedTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2666CF" }}>
                    Albaranes
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead style={{ backgroundColor: "#003366", color: "#fff" }}>
                        <tr>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Número de Albarán</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Fecha</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Cliente</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px" }}>AL-2023-001</td>
                          <td style={{ padding: "8px" }}>02/01/2023</td>
                          <td style={{ padding: "8px" }}>Cliente B</td>
                          <td style={{ padding: "8px", color: "#FFC107", fontWeight: "bold" }}>Pendiente</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          {selectedTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2666CF" }}>
                    Pedidos
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead style={{ backgroundColor: "#003366", color: "#fff" }}>
                        <tr>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Número de Pedido</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Fecha</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Cliente</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Total</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px" }}>PE-2023-001</td>
                          <td style={{ padding: "8px" }}>03/01/2023</td>
                          <td style={{ padding: "8px" }}>Cliente C</td>
                          <td style={{ padding: "8px" }}>2,500.00 €</td>
                          <td style={{ padding: "8px", color: "#DC3545", fontWeight: "bold" }}>Cancelado</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          {selectedTab === 4 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2666CF" }}>
                    Pagos
                  </Typography>
                  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead style={{ backgroundColor: "#003366", color: "#fff" }}>
                        <tr>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Fecha de Pago</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Nombre Cliente</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Número de Factura</th>
                          <th style={{ padding: "8px", fontWeight: "bold" }}>Total Pagado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "8px" }}>04/01/2023</td>
                          <td style={{ padding: "8px" }}>Cliente D</td>
                          <td style={{ padding: "8px" }}>FA-2023-002</td>
                          <td style={{ padding: "8px" }}>1,800.00 €</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
          {selectedTab === 5 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    bgcolor: "#FFF8DC",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#856404" }}>
                    Notas
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: "#FFF8DC",
                          borderRadius: 2,
                          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                          position: "relative",
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                          Nota Importante
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#856404" }}>
                          Revisar el envío del pedido antes del cierre.
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            textTransform: "none",
                            color: "#856404",
                            fontWeight: "bold",
                          }}
                        >
                          Leer más
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Drawer>
  );
};

export default ContactDetailsDrawer;
