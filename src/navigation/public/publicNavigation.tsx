import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../../screens/onboardingScreen/onboardingScreen';
import { AuthTabs } from '../components/authTabs';
import { NavigationRoutes } from '../../types/navigation.types';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
