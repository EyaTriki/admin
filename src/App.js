import React from 'react';

import { AuthProvider } from './context/AuthContext'; // Assurez-vous que le chemin est correct
import Routes from './navigation/AppRoutes'; // Ce doit être votre composant qui encapsule les Route de react-router-dom

function App() {
  return (
  
      <AuthProvider>
        <Routes />
      </AuthProvider>
   
  );
}

export default App;
