import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {enableScreens} from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';

enableScreens();

const MainRoutes = () => {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  );
};

export default MainRoutes;
