// components/ContactsSearchFilters.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PortalIcon from "@mui/icons-material/Language";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

interface Column {
  id: string;
  label: string;
}

interface ContactsSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  setFilter: (filter: string) => void;
  onAdd: () => void;
  onImportExport: () => void;
  onPortal: () => void;
  anchorEl: HTMLElement | null;
  onColumnsMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onColumnsMenuClose: () => void;
  visibleColumns: string[];
  onColumnToggle: (column: string) => void;
  allColumns: Column[];
}

const ContactsSearchFilters: React.FC<ContactsSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  setFilter,
  onAdd,
  onImportExport,
  onPortal,
  anchorEl,
  onColumnsMenuOpen,
  onColumnsMenuClose,
  visibleColumns,
  onColumnToggle,
  allColumns,
}) => {
  // Estado para filtrar columnas dentro del dropdown
  const [dropdownSearch, setDropdownSearch] = useState("");

  // Filtra las columnas según lo que se escriba en el buscador interno
  const filteredColumns = allColumns.filter((column) =>
    column.label.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant={filter === "todos" ? "contained" : "outlined"}
          onClick={() => setFilter("todos")}
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
          TODOS
        </Button>
        <Button
          variant={filter === "clientes" ? "contained" : "outlined"}
          onClick={() => setFilter("clientes")}
          sx={{ mr: 1 }}
        >
          CLIENTES
        </Button>
        <Button
          variant={filter === "proveedores" ? "contained" : "outlined"}
          onClick={() => setFilter("proveedores")}
        >
          PROVEEDORES
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
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
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Agregar
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#2666CF",
            borderColor: "#2666CF",
            fontWeight: "500",
            minWidth: "150px",
          }}
          startIcon={<ImportExportIcon />}
          onClick={onImportExport}
        >
          Importar/Exportar
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#2666CF",
            borderColor: "#2666CF",
            fontWeight: "500",
            minWidth: "120px",
          }}
          startIcon={<PortalIcon />}
          onClick={onPortal}
        >
          Portal
        </Button>
        {/* Botón amarillo para desplegar el selector de columnas */}
        <IconButton
          sx={{
            bgcolor: "#FFA500",
            color: "#ffffff",
            borderRadius: 2,
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s ease",
            "&:hover": { bgcolor: "#FF8C00" },
            minWidth: "48px",
            minHeight: "48px",
          }}
          onClick={onColumnsMenuOpen}
        >
          <ViewColumnIcon />
        </IconButton>
        {/* Dropdown mejorado */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onColumnsMenuClose}
          PaperProps={{
            sx: {
              maxHeight: 400,
              width: 300,
              borderRadius: 2,
              p: 1,
              boxShadow: "0px 3px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Campo de búsqueda interno */}
          <Box sx={{ px: 1, pb: 1 }}>
            <TextField
              variant="outlined"
              placeholder="Buscar columnas..."
              value={dropdownSearch}
              onChange={(e) => setDropdownSearch(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  backgroundColor: "#f9f9f9",
                },
              }}
            />
          </Box>
          {/* Lista de columnas filtradas */}
          {filteredColumns.length === 0 ? (
            <Box sx={{ px: 2, py: 1, color: "text.secondary" }}>
              No se encontraron columnas.
            </Box>
          ) : (
            filteredColumns.map((column) => (
              <MenuItem
                key={column.id}
                onClick={() => {
                  onColumnToggle(column.id);
                }}
              >
                <Checkbox
                  checked={visibleColumns.includes(column.id)}
                  sx={{ marginRight: 1 }}
                />
                {column.label}
              </MenuItem>
            ))
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default ContactsSearchFilters;
