import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import InputGeneric from '../../components/genericInput';
import GenericDropdown from '../../components/dropDown';
import useCreateItem from './hooks/useItem';
import GenericButton from '../../components/genericButton';
import {
  fontSubtitleBold,
  height,
  primaryColor,
  width,
} from '../../utils/styles';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

const CreateItemScreen = () => {
  const {
    itemData,
    shoppingLists,
    statusOptions,
    handleChange,
    handleCreateItem,
    loading,
    error,
    fetchShoppingLists,
  } = useCreateItem();

  useFocusEffect(
    React.useCallback(() => {
      fetchShoppingLists();
    }, [fetchShoppingLists]),
  );

  const shoppingListDropdownData = shoppingLists.map(list => ({
    label: list.name,
    value: list.id,
  }));

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require('../../assets/img/item.png')}
          style={styles.image}
        />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <InputGeneric
              placeholder="Item Name"
              value={itemData.name}
              onChangeText={(text: string) => handleChange('name', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
              width={330}
              icon="pricetag-outline"
            />
            <InputGeneric
              placeholder="Item Description"
              value={itemData.description}
              onChangeText={(text: string) => handleChange('description', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
              icon="document-text-outline"
              width={330}
            />
            <InputGeneric
              placeholder="Quantity"
              value={String(itemData.quantity)}
              keyboardType="numeric"
              onChangeText={(text: string) => handleChange('quantity', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
              width={330}
              icon="apps-outline"
            />
            <InputGeneric
              placeholder="Amount"
              value={String(itemData.amount)}
              keyboardType="numeric"
              onChangeText={(text: string) => handleChange('amount', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
              width={330}
              icon="cash-outline"
            />
            <GenericDropdown
              data={statusOptions}
              selectedValue={itemData.status}
              setSelectedValue={value => handleChange('status', value)}
              placeholder="Select Status"
              width={330}
              height={45}
            />

            <GenericDropdown
              data={shoppingListDropdownData}
              selectedValue={itemData.shoppingListId}
              setSelectedValue={value => handleChange('shoppingListId', value)}
              placeholder="Select Shopping List"
              width={330}
              height={45}
            />

            <View style={styles.containerButton}>
              {loading ? (
                <Loader />
              ) : (
                <GenericButton
                  title="Create Item"
                  onPress={handleCreateItem}
                  disabled={loading}
                  color="#FFF"
                  backgroundColor="#000"
                />
              )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: width * 0.2,
  },
  image: {
    width: width * 1,
    height: height * 0.32,
    resizeMode: 'contain',
  },
  inputContainer: {
    gap: width * 0.032,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noListsText: {
    color: 'red',
    fontFamily: fontSubtitleBold,
    fontSize: 12,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontFamily: fontSubtitleBold,
    fontSize: 13,
  },
  containerButton: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateItemScreen;
