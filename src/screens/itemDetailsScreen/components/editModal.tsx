import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useEditItem from '../hooks/useEditItem';
import BottomSheet from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput';
import GenericButton from '../../../components/genericButton';
import {fontSubtitleBold, height, primaryColor, width} from '../../../utils/styles';
import Loader from '../../../components/Loader';

interface EditItemProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    quantity: number;
    category: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

const EditItem: React.FC<EditItemProps> = ({item}) => {
  const {
    loading,
    error,
    editItem,
    itemData,
    handleChange,
    modalVisible,
    toggleModal,
  } = useEditItem(item);

  const handleSubmit = () => {
    editItem(item.id, itemData);
  };

  return (
    <View style={styles.container}>
      <Icon name="edit" size={28} color="#000" onPress={toggleModal} />
      <BottomSheet
        isVisible={modalVisible}
        onClose={toggleModal}
        height={670}
        backgroundColor={primaryColor}>
        <Image
          source={require('../../../assets/img/paint.png')}
          style={styles.image}
        />
        <View style={styles.inputsContainer}>
          <InputGeneric
            placeholder="Item Name"
            value={itemData.name}
            onChangeText={text => handleChange('name', text)}
            backgroundColor="rgba(0, 0, 0, 0.4)"
            height={45}
            width={320}
            icon="pricetag-outline"
          />
          <InputGeneric
            placeholder="Description"
            value={itemData.description || ''}
            onChangeText={text => handleChange('description', text)}
            backgroundColor="rgba(0, 0, 0, 0.4)"
            height={45}
            icon="document-text-outline"
            width={320}
          />
          <InputGeneric
            placeholder="Quantity"
            value={String(itemData.quantity)}
            onChangeText={text => handleChange('quantity', Number(text))}
            keyboardType="numeric"
            backgroundColor="rgba(0, 0, 0, 0.4)"
            height={45}
            width={320}
            icon="apps-outline"
          />
          <InputGeneric
            placeholder="Category"
            value={itemData.category}
            onChangeText={text => handleChange('category', text)}
            backgroundColor="rgba(0, 0, 0, 0.4)"
            height={45}
            width={320}
            icon="color-filter-outline"
          />
          <InputGeneric
            placeholder="Amount"
            value={String(itemData.amount)}
            onChangeText={text => handleChange('amount', text)}
            keyboardType="numeric"
            backgroundColor="rgba(0, 0, 0, 0.4)"
            height={45}
            width={320}
            icon="cash-outline"
          />
        </View>

        <View style={styles.buttonContainer}>
          <GenericButton
            title="Update"
            onPress={handleSubmit}
            disabled={loading}
            color="#FFF"
            backgroundColor="#000"
          />
        </View>
        {loading &&   <Loader  />}
        {error && <Text style={styles.error}>{error}</Text>}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontFamily: fontSubtitleBold,
    fontSize: 13,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  inputsContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 5,
  },
});

export default EditItem;
