import React from 'react';

import { useAuth } from '../hooks/auth';

import AppRoutes from './app.stack.routes';
import AuthRoutes from './auth.stack.routes';
import Loading from '../components/Loading';

const Routes: React.FC = () => {
  const { user, loading, codeChecked } = useAuth();

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return user && codeChecked ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
