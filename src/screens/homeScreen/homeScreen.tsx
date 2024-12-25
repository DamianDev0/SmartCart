import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShoppingListComponent from './components/bottomShoppinList';
import {primaryColor} from '../../utils/styles';
import HeaderHome from './components/headerHome';
import RecentItemsComponent from './components/sliderComponent';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderHome />
      </View>
      <View style={styles.recentItems}>
        <RecentItemsComponent />
      </View>
      <View style={styles.bottom}>
        <ShoppingListComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  header: {
    flex: 0.1,
  },
  recentItems: {
    flex: 0.75,
    marginTop: 20,
  },
  bottom: {
    flex: 0.75,
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
