// components/PasswordDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
  isPasswordEnabled: boolean;
  setIsPasswordEnabled: (value: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  open,
  onClose,
  isPasswordEnabled,
  setIsPasswordEnabled,
  password,
  setPassword,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Añadir Contraseña</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPasswordEnabled}
              onChange={(e) => setIsPasswordEnabled(e.target.checked)}
            />
          }
          label="Activar contraseña para este cliente"
        />
        {isPasswordEnabled && (
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onClose} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordDialog;
