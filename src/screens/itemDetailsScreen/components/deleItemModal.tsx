import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDeleteItem from '../hooks/useDeleteItem';
import BottomSheet from '../../../components/modal.component';
import GenericButton from '../../../components/genericButton';
import {fontSubtitleBold, height, primaryColor, width} from '../../../utils/styles';

interface DeleteItemProps {
  itemId: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({itemId}) => {
  const {loading, error, deleteItem} = useDeleteItem();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const handleDelete = () => {
    deleteItem(itemId);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Icon name="trash-can-outline" size={30} color="red" />
      </TouchableOpacity>
      <BottomSheet
        isVisible={modalVisible}
        onClose={toggleModal}
        height={500}
        backgroundColor={primaryColor}>
        <Image
          source={require('../../../assets/img/delete.png')}
          style={styles.image}
        />
        <Text style={styles.confirmText}>
          Are you sure you want to delete this item?
        </Text>
        <View style={styles.buttonContainer}>
          <GenericButton
            title="Confirmar"
            onPress={handleDelete}
            disabled={loading}
            color="#FFF"
            backgroundColor="#000"
            width={150}
          />
          <GenericButton
            title="Cancelar"
            onPress={toggleModal}
            color="#FFF"
            backgroundColor="red"
            width={150}
          />
        </View>
        {loading && <ActivityIndicator size="large" color="#000" />}
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
  image: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 13,
    fontFamily: fontSubtitleBold,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DeleteItem;