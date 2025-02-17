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
        p: 3,
        borderRadius: 2,
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        bgcolor: '#ffffff',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
        },
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
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1A1A40' }}>
        {user?.name || "Nombre no disponible"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
        {user?.email || "Email no disponible"}
      </Typography>
      <Button
        variant="outlined"
        fullWidth
        onClick={onChangePhoto}
        sx={{
          mb: 2,
          textTransform: 'none',
          borderColor: '#2666CF',
          color: '#2666CF',
          '&:hover': {
            backgroundColor: 'rgba(38, 102, 207, 0.1)',
            borderColor: '#6A82FB',
          },
        }}
      >
        Cambiar Foto
      </Button>
      <Button
        variant="text"
        fullWidth
        onClick={onDeleteAccount}
        sx={{
          textTransform: 'none',
          color: '#E53935',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'rgba(229,57,53,0.1)',
          },
        }}
      >
        Eliminar Cuenta
      </Button>
    </Card>
  );
};

export default ProfileCard;
