// components/LinkPersonDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Contact } from "../../../types/Contact";

interface LinkPersonDialogProps {
  open: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredPeople: Contact[];
  onLinkContact: (personId: string) => void;
}

const LinkPersonDialog: React.FC<LinkPersonDialogProps> = ({
  open,
  onClose,
  searchTerm,
  onSearchChange,
  filteredPeople,
  onLinkContact,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Relacionar persona</DialogTitle>
      <DialogContent>
        <TextField
          label="Buscar persona"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={onSearchChange}
          sx={{ mb: 2 }}
        />
        <List>
          {filteredPeople.map((person) => (
            <ListItem key={person.id} disableGutters>
              <ListItemButton onClick={() => onLinkContact(person.id)}>
                <ListItemText primary={person.nombre} secondary={person.tipoContacto} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LinkPersonDialog;
