import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../../../types/Contact';

interface Column {
  id: string;
  label: string;
}

interface ContactTableProps {
  contacts: Contact[];
  visibleColumns: string[];
  allColumns: Column[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
  onRowClick: (contact: Contact) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  visibleColumns,
  allColumns,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  // Creamos un arreglo de columnas visibles ordenado según el orden definido en allColumns
  const sortedVisibleColumns = allColumns.filter((column) =>
    visibleColumns.includes(column.id)
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Table sx={{ minWidth: '100%' }}>
        <TableHead
          sx={{
            bgcolor: '#2666CF',
            '& th': { color: '#ffffff', fontWeight: '600' },
          }}
        >
          <TableRow>
            {sortedVisibleColumns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => {
            const key = contact.id || `contact-${uuidv4()}`;
            return (
              <TableRow
                key={key}
                sx={{ '&:hover': { bgcolor: '#F1F1F1', cursor: 'pointer' } }}
                onClick={() => onRowClick(contact)}
              >
                {sortedVisibleColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={
                      column.id === 'tipoContacto'
                        ? {
                            bgcolor:
                              contact[column.id] === 'Cliente'
                                ? '#d4edda'
                                : '#fff3cd',
                            color:
                              contact[column.id] === 'Cliente'
                                ? '#155724'
                                : '#856404',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                          }
                        : {}
                    }
                  >
                    {contact[column.id]}
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
