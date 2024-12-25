import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShoppingListComponent from './components/bottomShoppinList';
import {primaryColor} from '../../utils/styles';
import HeaderHome from './components/headerHome';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderHome />
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
    flex: 0.2,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default HomeScreen;
