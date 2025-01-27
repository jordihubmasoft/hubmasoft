// components/ContactTable.tsx
import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos

interface Column {
  id: string;
  label: string;
}

interface Contact {
  id: number;
  [key: string]: any;
}

interface ContactTableProps {
  contacts: Contact[];
  visibleColumns: string[];
  allColumns: Column[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: number) => void;
  onRowClick: (contact: Contact) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  visibleColumns,
  allColumns,
  onEdit,
  onDelete,
  onRowClick
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
      <Table sx={{ minWidth: '100%' }}>
        <TableHead sx={{ bgcolor: '#2666CF', '& th': { color: '#ffffff', fontWeight: '600' } }}>
          <TableRow>
            {allColumns.map((column) =>
              visibleColumns.includes(column.id) ? <TableCell key={column.id}>{column.label}</TableCell> : null
            )}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => {
            // Validar si contact.id es un número válido
            const isValidId = typeof contact.id === 'number' && !isNaN(contact.id);
            // Asignar una key única: usar contact.id si es válido, sino generar una key única
            const key = isValidId ? contact.id : `contact-${uuidv4()}`;

            if (!isValidId) {
              console.warn(`Contacto en el índice ${index} tiene un ID inválido:`, contact);
            }

            return (
              <TableRow
                key={key}
                sx={{ '&:hover': { bgcolor: '#F1F1F1', cursor: 'pointer' } }}
                onClick={() => onRowClick(contact)}
              >
                {visibleColumns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      ...(column === 'tipoContacto' && {
                        bgcolor: contact[column] === 'Cliente' ? '#d4edda' : '#fff3cd',
                        color: contact[column] === 'Cliente' ? '#155724' : '#856404',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                      }),
                    }}
                  >
                    {contact[column]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onEdit(contact); 
                    }}
                    sx={{ color: '#1A1A40' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onDelete(contact.id); 
                    }}
                    sx={{ color: '#B00020' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;
