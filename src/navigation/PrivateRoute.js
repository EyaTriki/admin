import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que ce hook est bien implémenté

function PrivateRoute({ children }) {
  const { userToken } = useAuth(); // Récupération de l'état d'authentification
  const location = useLocation();

  if (!userToken) {
    // Rediriger vers la page de login en gardant la redirection après la connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;