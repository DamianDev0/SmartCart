import React from 'react';
import MainRoutes from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/authContext';

const App = () => {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
};

export default App;
