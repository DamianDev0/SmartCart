import React from 'react';
import {NavigationRoutes} from '../../types/navigationTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../../screens/onboardingScreen/onboardingScreen';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
