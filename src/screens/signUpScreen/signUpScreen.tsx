import React from 'react';
import {View, StyleSheet} from 'react-native';
import RegisterForm from './components/registerForm';
import {primaryColor} from '../../utils/styles';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'flex-end',
  },
});

export default SignUpScreen;
