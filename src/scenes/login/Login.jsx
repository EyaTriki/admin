import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Utilisez la méthode login du contexte

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);  // Appelez la méthode login du contexte
      navigate('/');  // Redirigez l'utilisateur après la connexion réussie
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : 'Unknown error');
      // Affichez un message d'erreur si la connexion échoue
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00796B',
      },
      secondary: {
        main: '#3F51B5',
      },
      error: {
        main: '#E53935',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#e0e0e3',
        }}
      >
        <Paper elevation={6} sx={{ padding: 6, maxWidth: '600px', width: '100%' }}>
          <Typography variant="h5" color="primary" align="center">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
