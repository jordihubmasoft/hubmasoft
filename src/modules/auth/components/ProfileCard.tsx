import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { useAuth } from '../context/AuthContext'; // Ya no será necesario si mostramos datos del form

interface ProfileCardProps {
  onChangePhoto: () => void;
  onDeleteAccount: () => void;
  /**
   * Nombre y correo provenientes del formulario (o del contacto en BD)
   */
  name: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  onChangePhoto,
  onDeleteAccount,
  name,
  email,
}) => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 4,
        borderRadius: 4,
        boxShadow: '0 6px 24px rgba(38,102,207,0.10)',
        bgcolor: '#f8fafd',
        transition: '0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1A1A40',
          width: 120,
          height: 120,
          fontSize: 56,
          mx: 'auto',
          mb: 2,
          border: '4px solid #2666CF',
          boxShadow: '0 4px 16px rgba(38,102,207,0.15)',
        }}
      >
        {name?.charAt(0)?.toUpperCase() || 'NA'}
      </Avatar>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1A1A40', letterSpacing: 0.5 }}>
        {name || 'Nombre no disponible'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: '#555', fontSize: 16 }}>
        {email || 'Email no disponible'}
      </Typography>
      <Button
        variant="contained"
        startIcon={<PhotoCameraIcon />}
        fullWidth
        onClick={onChangePhoto}
        sx={{
          mb: 1.5,
          textTransform: 'none',
          background: 'linear-gradient(90deg, #2666CF, #6A82FB)',
          color: '#fff',
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(38,102,207,0.10)',
          '&:hover': {
            background: 'linear-gradient(90deg, #6A82FB, #2666CF)',
          },
        }}
      >
        Reemplazar foto
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteForeverIcon />}
        fullWidth
        onClick={onDeleteAccount}
        sx={{
          textTransform: 'none',
          color: '#E53935',
          borderColor: '#E53935',
          fontWeight: 'bold',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'rgba(229,57,53,0.08)',
            borderColor: '#B71C1C',
          },
        }}
      >
        Eliminar cuenta
      </Button>
    </Card>
  );
};

export default ProfileCard;
