import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificamos si existe un token en el localStorage para saber si está logueado
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Si no hay token, lo mandamos al login
    return <Navigate to="/login" replace />;
  }
  
  // Si hay token, renderiza el componente hijo (la ruta protegida)
  return children;
};

export default ProtectedRoute;
