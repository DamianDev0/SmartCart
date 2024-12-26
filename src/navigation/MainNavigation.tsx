import React from 'react';
import {enableScreens} from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';
import PrivateRoutes from './private/privateNavigation';
import {useAuth} from '../context/authContext';

enableScreens();

const MainRoutes = () => {
  const {isAuthenticated} = useAuth();

  return <>{isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default MainRoutes;
