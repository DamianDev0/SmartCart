import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontSubtitleBold, height, width} from '../../../utils/styles';
import useHeader from '../hooks/useHeader';

const HeaderHome = () => {
  const {handleLogOut} = useHeader();
  return (
    <View style={styles.container}>
      <View style={styles.containerAvatarAndText}>
        <Image
          source={require('../../../assets/img/avatar.png')}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <TouchableOpacity onPress={handleLogOut}>
        <Icon name="log-out-outline" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerAvatarAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width * 0.15,
    height: height * 0.08,
    resizeMode: 'contain',
    marginRight: 1,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: fontSubtitleBold,
    color: '#000',
  },
});

export default HeaderHome;
