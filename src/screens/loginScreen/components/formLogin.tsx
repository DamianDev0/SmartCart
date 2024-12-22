import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  height,
  primaryColor,
  secondaryColor,
  secondaryColorLigth,
  width,
} from '../../../utils/styles';
import useLogin from '../hooks/useLogin';
import InputGeneric from '../../../components/genericInput';
import GenericButton from '../../../components/genericButton';
import {CustomToast} from '../../../components/customToast';

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
            <ActivityIndicator size="large" color="#000" />
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
                <GenericButton
                  title="Login with Fingerprint"
                  onPress={loginWithFingerprint}
                  disabled={loading}
                  backgroundColor={secondaryColor}
                  color="#FFFF"
                  width={330}
                />
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
  },
  loginButton: {
    alignItems: 'center',
  },
  containerInputs: {
    alignItems: 'center',
    gap: 20,
  },
  biometricButton: {
    marginTop: 20,
  },
});

export default LoginForm;
