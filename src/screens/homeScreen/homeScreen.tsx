import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ShoppingListComponent from './components/bottomShoppinList';
import {primaryColor} from '../../utils/styles';
import HeaderHome from './components/headerHome';
import RecentItemsComponent from './components/sliderComponent';
import useShoppingLists from './hooks/useShoppinList';

const HomeScreen: React.FC = () => {
  const {fetchShoppingLists, loading, shoppingLists, error} =
    useShoppingLists();

  useFocusEffect(
    useCallback(() => {
      fetchShoppingLists();
    }, [fetchShoppingLists]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderHome fetchShoppingLists={fetchShoppingLists} loading={loading} />
      </View>
      <View style={styles.recentItems}>
        <RecentItemsComponent />
      </View>
      <View style={styles.bottom}>
        <ShoppingListComponent
          loading={loading}
          shoppingLists={shoppingLists}
          error={error}
        />
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
