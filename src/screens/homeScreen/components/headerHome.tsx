import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontSubtitleBold, height, width} from '../../../utils/styles';
import useHeader from '../hooks/useHeader';
import CreateShoppingList from './modalShoppinList';

interface HeaderHomeProps {
  fetchShoppingLists: () => void;
  loading: boolean;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  fetchShoppingLists,
  loading,
}) => {
  const {handleLogOut} = useHeader();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatarAndText}>
        <Image
          source={require('../../../assets/img/avatar.png')}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openModal} style={styles.iconButton}>
          <MaterialIcons name="add-shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.iconButton}>
          <MaterialIcons name="logout" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <CreateShoppingList
        isVisible={isModalVisible}
        onClose={closeModal}
        fetchShoppingLists={fetchShoppingLists}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerAvatarAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  image: {
    width: width * 0.12,
    height: height * 0.07,
    resizeMode: 'contain',
    marginRight: 1,
  },
  welcomeText: {
    fontSize: 13,
    fontFamily: fontSubtitleBold,
    color: '#000',
  },
});

export default HeaderHome;
