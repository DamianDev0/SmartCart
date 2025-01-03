import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {ShoppingListResponse} from '../../../interfaces/shoppinList.interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fontSubtitleBold,
  fontTextLigth,
  fontTitle,
  height,
  secondaryColorLigth,
  width,
} from '../../../utils/styles';
import {CustomToast} from '../../../components/customToast';
import useNavigation from '../../../hooks/useNavigation';
import Loader from '../../../components/Loader';

interface ShoppingListComponentProps {
  loading: boolean;
  shoppingLists: ShoppingListResponse[] | undefined;
  error: string | null;
}

const ShoppingListComponent: React.FC<ShoppingListComponentProps> = ({
  loading,
  shoppingLists,
  error,
}) => {
  const navigation = useNavigation();

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
    return (
      <View style={styles.loadingContainer}>
      <Loader  />
      </View>
    );
  }

  if (!shoppingLists || shoppingLists.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Image
          source={require('../../../assets/img/time.png')}
          style={styles.noItemsImage}
        />
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
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('ShoppinList', {
                id: item.id,
                name: item.name,
                context: item.context,
              })
            }>
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
    justifyContent: 'flex-end',
    backgroundColor: secondaryColorLigth,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noItemsImage: {
    width: width * 0.6,
    height: height * 0.24,
    marginBottom: 20,
  },
  noItemsText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontFamily: fontSubtitleBold,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: fontTitle,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#000',
    borderWidth: 0.5,
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
  listContainer: {
    paddingBottom: 20,
  },
});

export default ShoppingListComponent;
