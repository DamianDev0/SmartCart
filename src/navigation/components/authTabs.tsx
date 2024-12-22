import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginScreen from '../../screens/loginScreen/loginScreen';
import SignUpScreen from '../../screens/signUpScreen/signUpScreen';
import {TabRoutes} from '../../types/navigation.types';
import {StyleSheet, View} from 'react-native';
import {
  fontTitle,
  primaryColor,
  secondaryColor,
  width,
} from '../../utils/styles';

const Tab = createMaterialTopTabNavigator<TabRoutes>();

export const AuthTabs = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarActiveTintColor: secondaryColor,
          tabBarInactiveTintColor: '#000000',
          tabBarItemStyle: styles.tabBarItem,
        }}>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  tabBar: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    width: width * 0.8,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  tabBarItem: {
    paddingHorizontal: 20,
  },
  tabBarLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fontTitle,
  },
  tabBarIndicator: {
    backgroundColor: '#000',
  },
});

export default AuthTabs;
