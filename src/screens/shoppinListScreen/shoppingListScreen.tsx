import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ShoppingListItems from './components/itemsShoppinList';
import {fontTitle, height, primaryColor, width} from '../../utils/styles';
import SuggestItems from './components/suggestItem';

const ShoppingListScreen = () => {
  const route = useRoute();
  const shoppinList = route.params as {
    id: string;
    name: string;
    context: string;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/eCommerce.png')}
        style={styles.headerImage}
      />
      <Text style={styles.text}>{shoppinList.name}</Text>
      <View style={styles.iconContainer}>
        <SuggestItems shoppingListId={shoppinList.id} />
      </View>
      <ShoppingListItems shoppingListId={shoppinList.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: primaryColor,
  },
  headerImage: {
    width: width * 0.6,
    height: height * 0.3,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    fontFamily: fontTitle,
    marginBottom: 20,
    color: '#000',
  },
  iconContainer: {
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    left: 15,
    flexDirection: 'row',
    width : width,
  },
});

export default ShoppingListScreen;
