// src/modules/auth/components/ProfileCard.tsx
import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

interface ProfileCardProps {
  onChangePhoto: () => void;
  onDeleteAccount: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onChangePhoto, onDeleteAccount }) => {
  const { user } = useAuth();

  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: '30px',
        borderRadius: 5,
        boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
        bgcolor: '#f0f0f0',
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1A1A40',
          width: 100,
          height: 100,
          fontSize: 50,
          mx: 'auto',
          mb: 2,
        }}
        src={user?.avatarUrl || undefined}
      >
        {user?.name?.charAt(0).toUpperCase() || 'NA'}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {user?.name || "Nombre no disponible"}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        {user?.email || "Email no disponible"}
      </Typography>
      <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={onChangePhoto}>
        Cambiar Foto
      </Button>
      <Button
        variant="text"
        color="error"
        fullWidth
        onClick={onDeleteAccount}
        sx={{
          '&:hover': {
            color: '#ff4d4f',
          },
        }}
      >
        Eliminar Cuenta
      </Button>
    </Card>
  );
};

export default ProfileCard;
