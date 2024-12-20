import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';
import InputGeneric from '../../../components/genericInput';
import useRegister from '../hooks/useRegister';
import {primaryColor} from '../../../utils/styles';

const RegisterForm = () => {
  const {formState, handleChange, registerWithFingerprint, loading, error} =
    useRegister();

  const handleRegister = async () => {
    await registerWithFingerprint();
  };

  return (
    <View style={styles.container}>
      <InputGeneric
        placeholder="Name"
        value={formState.name}
        onChangeText={(text: string) => handleChange('name', text)}
        style={styles.input}
      />
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
        <ActivityIndicator size="large" color="#0000" />
      ) : (
        <Button title="Register" onPress={handleRegister} />
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterForm;
