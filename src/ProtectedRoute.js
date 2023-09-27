import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from './firebase';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuthState();
  return user ? <Route element={element} {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
