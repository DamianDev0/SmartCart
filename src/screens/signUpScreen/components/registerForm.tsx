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
  secondaryColorLigth,
  width,
} from '../../../utils/styles';
import useRegister from '../hooks/useRegister';
import SuccessModal from '../../../components/successModal';
import InputGeneric from '../../../components/genericInput';
import GenericButton from '../../../components/genericButton';
import {CustomToast} from '../../../components/customToast';

const RegisterForm = () => {
  const {
    formState,
    handleChange,
    registerWithFingerprint,
    loading,
    error,
    showSuccessModal,
    setShowSuccessModal,
  } = useRegister();

  useEffect(() => {
    if (error) {
      CustomToast({
        type: 'error',
        text1: 'Registration Failed',
        text2: error,
        position: 'bottom',
      });
    }
  }, [error]);

  const handleRegister = async () => {
    await registerWithFingerprint();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/img/register.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={styles.formContainer}>
          <View style={styles.containerInputs}>
            <InputGeneric
              placeholder="Name"
              icon="person-outline"
              value={formState.name}
              onChangeText={(text: string) => handleChange('name', text)}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              height={45}
              width={330}
            />
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
            <ActivityIndicator size="large" color="#0000" />
          ) : (
            <View style={styles.registerButton}>
              <GenericButton
                title={loading ? 'SignUp...' : 'SignUp'}
                onPress={handleRegister}
                disabled={loading}
                backgroundColor="#000000"
                color="#FFFF"
              />
            </View>
          )}
        </View>
        <SuccessModal
          isVisible={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          imageUrl={require('../../../assets/img/succes.png')}
          message="Registration Successful!"
        />
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
  registerButton: {
    alignItems: 'center',
  },
  containerInputs: {
    alignItems: 'center',
    gap: 20,
  },
});

export default RegisterForm;
