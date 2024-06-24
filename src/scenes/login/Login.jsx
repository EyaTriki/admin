import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, TextField, Button, Box, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    typography: {
      h5: {
        fontWeight: 600,
      },
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="logo"
              width="50%"
              height="50%"
              src={`../../assets/logovff.jpg`}
            />
          </Box>
          <Typography variant="h5" color="primary" align="center" style={{marginBottom:10}}>
            Sign In to Your Admin Account
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
              InputLabelProps={{ style: { color: '#00796B' } }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#00796B' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
