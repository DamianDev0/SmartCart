import React from 'react';
import MainRoutes from './src/navigation/MainNavigation';
import { AuthProvider } from './src/context/authContext';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainRoutes />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
