import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import BottomSheet from './modal.component';
import {
  fontSubtitleBold,
  height,
  primaryColor,
  terceryColor,
  width,
} from '../utils/styles';

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  imageUrl: any;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  onClose,
  message,
  imageUrl,
}) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      height={400}
      backgroundColor={primaryColor}>
      <View style={styles.content}>
        <Image source={imageUrl} style={styles.image} />
        <Text style={styles.title}>{message}</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fontSubtitleBold,
    color: terceryColor,
    maxWidth: width * 0.8,
    letterSpacing: 0.5,
  },
});

export default SuccessModal;
