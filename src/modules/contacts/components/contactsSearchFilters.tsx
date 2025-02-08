// components/ContactsSearchFilters.tsx
import React from "react";
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onColumnsMenuClose}
          PaperProps={{
            style: { maxHeight: "400px", width: "250px" },
          }}
        >
          {allColumns.map((column) => (
            <MenuItem key={column.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleColumns.includes(column.id)}
                    onChange={() => onColumnToggle(column.id)}
                  />
                }
                label={column.label}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default ContactsSearchFilters;
