// HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShoppingListComponent from './components/bottomShoppinList';
import { primaryColor } from '../../utils/styles';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ShoppingListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: primaryColor
  },
});

export default HomeScreen;
