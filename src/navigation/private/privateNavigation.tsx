import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationRoutes} from '../../types/navigation.types';
import PrivateTabs from '../components/privateTab';
import ItemDetailsScreen from '../../screens/itemDetailsScreen/itemDetailsScreen';
import ShoppingListScreen from '../../screens/shoppinListScreen/shoppingListScreen';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PrivateTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShoppinList"
        component={ShoppingListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
