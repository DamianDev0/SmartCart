// ShoppingListComponent.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {ShoppingListResponse} from '../../../interfaces/shoppinList.interface';
import useShoppingLists from '../hooks/useShoppinList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  fontTextLigth,
  fontTitle,
  secondaryColorLigth,
  width,
} from '../../../utils/styles';
import {CustomToast} from '../../../components/customToast';

const ShoppingListComponent: React.FC = () => {
  const {shoppingLists, loading, error} = useShoppingLists();

  useEffect(() => {
    if (error) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
    }
  }, [error]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!loading && shoppingLists.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemsText}>No shopping lists created yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Shopping List</Text>
      <FlatList
        data={shoppingLists}
        keyExtractor={(item: ShoppingListResponse) => item.id}
        renderItem={({item}: {item: ShoppingListResponse}) => (
          <View style={styles.itemContainer}>
            <Icon
              name="cart-outline"
              size={30}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemContext}>{item.context}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: secondaryColorLigth,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textContainer: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: fontTitle,
    color: '#000',
    marginBottom: 5,
  },
  itemContext: {
    fontSize: 12,
    color: '#000',
    maxWidth: width * 0.71,
    fontFamily: fontTextLigth,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: fontTitle,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
});

export default ShoppingListComponent;
