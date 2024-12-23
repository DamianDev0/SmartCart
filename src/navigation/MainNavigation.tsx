import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';
import PrivateRoutes from './private/privateNavigation';
import { useAuth } from '../context/authContext';

enableScreens();

const MainRoutes = () => {
  const { isAuthenticated } = useAuth();

  console.log('Is user authenticated:', isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default MainRoutes;
