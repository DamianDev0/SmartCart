import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useFetchItems from '../hooks/useItems';
import {
  fontSubtitleBold,
  fontTextLigth,
  fontTitle,
  height,
  secondaryColor,
  width,
} from '../../../utils/styles';
import useNavigation from '../../../hooks/useNavigation';
import Loader from '../../../components/Loader';

interface ShoppingListItemsProps {
  shoppingListId: string;
}

const ShoppingListItems: React.FC<ShoppingListItemsProps> = ({
  shoppingListId,
}) => {
  const {loading, items, error} = useFetchItems(shoppingListId);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Image
          source={require('../../../assets/img/achievement.png')}
          style={styles.noItemsImage}
        />
        <Text style={styles.noItemsText}>
          No items found for this shopping list.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('ItemDetails', {
                id: item.id,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                category: item.category || '',
                amount: item.amount,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
              })
            }>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemAmount}>${item.amount}</Text>
            </View>
            <Text
              style={styles.itemDescription}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.description}
            </Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>{item.status}</Text>
              <Icon
                name={
                  item.status === 'purchased' ? 'check-circle' : 'clock-outline'
                }
                size={20}
                color={item.status === 'purchased' ? secondaryColor : '#000'}
              />
            </View>
          </TouchableOpacity>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsImage: {
    width: width * 0.7,
    height: height * 0.25,
    marginBottom: 20,
  },
  noItemsText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontFamily: fontSubtitleBold,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderColor: '#000',
    borderWidth: 0.5,
    width: width * 0.79,
    height: height * 0.18,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 12,
    color: secondaryColor,
    fontFamily: fontTitle,
  },
  itemAmount: {
    fontSize: 11,
    fontFamily: fontTitle,
    color: '#000',
  },
  itemDescription: {
    fontSize: 12,
    marginBottom: 5,
    height: height * 0.06,
    fontFamily: fontTextLigth,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetail: {
    fontSize: 14,
    color: '#000',
    fontFamily: fontTextLigth,
    maxWidth: width * 0.4,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default ShoppingListItems;
