import React from 'react';
import {NavigationRoutes} from '../../types/navigation.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../../screens/onboardingScreen/onboardingScreen';
import LoginScreen from '../../screens/loginScreen/loginScreen';
import SignUpScreen from '../../screens/signUpScreen/signUpScreen';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
