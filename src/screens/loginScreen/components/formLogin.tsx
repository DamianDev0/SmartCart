import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  height,
  primaryColor,
  secondaryColorLigth,
  width,
} from '../../../utils/styles';
import useLogin from '../hooks/useLogin';
import InputGeneric from '../../../components/genericInput';
import GenericButton from '../../../components/genericButton';
import {CustomToast} from '../../../components/customToast';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../../components/Loader';

const LoginForm = () => {
  const {
    formState,
    handleChange,
    login,
    loginWithFingerprint,
    loading,
    error,
    isBiometricSupported,
  } = useLogin();

  useEffect(() => {
    if (error) {
      CustomToast({
        type: 'error',
        text1: 'Login Failed',
        text2: error,
        position: 'bottom',
      });
    }
  }, [error]);

  const handleLogin = async () => {
    await login();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/img/login.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <View style={styles.containerInputs}>
            <InputGeneric
              placeholder="Email"
              value={formState.email}
              onChangeText={(text: string) => handleChange('email', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              icon="mail-outline"
              height={45}
              width={330}
            />
            <InputGeneric
              placeholder="Password"
              value={formState.password}
              onChangeText={(text: string) => handleChange('password', text)}
              secureTextEntry
              backgroundColor="rgba(0, 0, 0, 0.4)"
              icon="lock-closed-outline"
              height={45}
              width={330}
            />
          </View>
          {loading ? (
          <Loader  />
          ) : (
            <View style={styles.loginButton}>
              <GenericButton
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                disabled={loading}
                backgroundColor="#000000"
                color="#FFFF"
              />
              {isBiometricSupported && (
                <TouchableOpacity onPress={loginWithFingerprint}>
                  <Icon name="finger-print-outline" size={38} color={'#000'} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  headerImage: {
    width: width * 0.9,
    height: height * 0.42,
    marginBottom: 10,
    marginLeft: 30,
  },
  formContainer: {
    justifyContent: 'space-between',
    backgroundColor: secondaryColorLigth,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: width * 1,
    height: height * 0.395,
    shadowColor: '#000',
    alignItems: 'center',
    padding: 30,
    borderColor: '#000',
    borderWidth: 0.6,
    elevation: 1,
  },
  loginButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.8,
    marginBottom: 40,
  },
  containerInputs: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    gap: width * 0.07,
  },
  biometricButton: {
    marginTop: 20,
  },
});

export default LoginForm;
