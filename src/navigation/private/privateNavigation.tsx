import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationRoutes} from '../../types/navigation.types';
import PrivateTabs from '../components/privateTab';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PrivateTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
