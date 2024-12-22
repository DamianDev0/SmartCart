import React from 'react';
import MainRoutes from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/authContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AuthProvider>
      <MainRoutes />
      <Toast />
    </AuthProvider>
  );
};

export default App;
