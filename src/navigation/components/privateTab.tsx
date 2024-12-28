import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {NavigationRoutes} from '../../types/navigation.types';
import HomeScreen from '../../screens/homeScreen/homeScreen';
import FormItemScreen from '../../screens/FormItemScreen/formItemScreen';
import {fontSubtitleBold, secondaryColor, width} from '../../utils/styles';
import TabBarIcon from './tabBarIcon';

const Tab = createBottomTabNavigator<NavigationRoutes>();
export const PrivateTabs = () => (
  <View style={{flex: 1}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => <TabBarIcon routeName={route.name} />,
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
        tabBarStyle: [styles.tabBarStyle, styles.staticTabBar],
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="FormItem"
        component={FormItemScreen}
        options={{tabBarLabel: 'Create'}}
      />
    </Tab.Navigator>
  </View>
);

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBarStyle: {
    position: 'absolute',
    width: width * 0.6,
    height: 60,
    alignSelf: 'center',
    bottom: 3,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 2,
    marginLeft: width * 0.2,
    overflow: 'hidden',
  },
  staticTabBar: {
    left: width * 0.2,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: width * 0.7,
  },
  tabBarLabelStyle: {
    fontSize: 9,
    fontFamily: fontSubtitleBold,
  },
  tabBarItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});

export default PrivateTabs;