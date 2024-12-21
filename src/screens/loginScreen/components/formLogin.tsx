import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import useLogin from '../hooks/useLogin';
import InputGeneric from '../../../components/genericInput';
import {primaryColor} from '../../../utils/styles';

const LoginForm = () => {
  const {
    formState,
    handleChange,
    login,
    loginWithFingerprint,
    loading,
    error,
    isBiometricSupported,
    handleGoToSignup
  } = useLogin();

  return (
    <View style={styles.container}>
      <InputGeneric
        placeholder="Email"
        value={formState.email}
        onChangeText={(text: string) => handleChange('email', text)}
        style={styles.input}
      />
      <InputGeneric
        placeholder="Password"
        value={formState.password}
        onChangeText={(text: string) => handleChange('password', text)}
        secureTextEntry
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={login} />
          {isBiometricSupported && (
            <TouchableOpacity
              onPress={loginWithFingerprint}
              style={styles.biometricButton}>
              <Text style={styles.biometricText}>Login with Fingerprint</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleGoToSignup}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  biometricButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  biometricText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  registerText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginForm;
