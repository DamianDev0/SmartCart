import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BottomSheet from '../../../components/modal.component';
import InputGeneric from '../../../components/genericInput';
import useCreateShoppingList from '../hooks/useShoppinModal';
import {height, primaryColor, width} from '../../../utils/styles';
import GenericButton from '../../../components/genericButton';
import Loader from '../../../components/Loader';

interface CreateShoppingListProps {
  isVisible: boolean;
  onClose: () => void;
  fetchShoppingLists: () => void;
  loading: boolean;
}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({
  isVisible,
  onClose,
  fetchShoppingLists,
  loading,
}) => {
  const {
    formState,
    handleChange,
    createShoppingList,
    loading: createLoading,
  } = useCreateShoppingList();

  const handleCreateShoppingList = async () => {
    await createShoppingList();
    fetchShoppingLists();
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      backgroundColor={primaryColor}
      height={500}>
      <View style={styles.form}>
        <Image
          source={require('../../../assets/img/shopping.png')}
          style={styles.image}
        />
        {createLoading || loading ? (
        <Loader  />
        ) : (
          <>
            <InputGeneric
              placeholder="Name"
              value={formState.name}
              onChangeText={(text: string) => handleChange('name', text)}
              icon="cart"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
            />
            <InputGeneric
              placeholder="Description"
              value={formState.context}
              onChangeText={(text: string) => handleChange('context', text)}
              icon="information-circle"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}

            />
            <GenericButton
              title="Create"
              onPress={handleCreateShoppingList}
              disabled={createLoading}
              color="#FFF"
              backgroundColor="#000"
              height={45}
            />
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  form: {
    width: width,
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: width * 0.65,
    height: height * 0.27,
  },
});

export default CreateShoppingList;
