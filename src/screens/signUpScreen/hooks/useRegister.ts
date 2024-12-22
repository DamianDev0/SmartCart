import {useState, useEffect} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import authService from '../../../services/authService';
import {RegisterRequest} from '../../../interfaces/auth.interface';
import {ApiError} from '../../../utils/errorHandler';
import useNavigation from '../../../hooks/useNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateForm} from '../../../utils/validateForm';

const useRegister = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    fingerprintId: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    const checkBiometricSupport = async () => {
      try {
        const {available} = await rnBiometrics.isSensorAvailable();
        setIsBiometricSupported(available);
      } catch (err) {
        setIsBiometricSupported(false);
      }
    };
    checkBiometricSupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      password: '',
      fingerprintId: '',
    });
  };

  const registerWithFingerprint = async () => {
    if (!validateForm(formState, setError)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!isBiometricSupported) {
        setError('Biometric authentication is not supported on this device.');
        setLoading(false);
        return;
      }

      const {success, error: biometricError} = await rnBiometrics.simplePrompt({
        promptMessage: 'Scan your fingerprint to register',
      });

      if (success) {
        const keyPairResult = await rnBiometrics.createKeys();
        if (!keyPairResult.publicKey) {
          setError('Failed to generate keys');
          setLoading(false);
          return;
        }

        await AsyncStorage.setItem('publicKey', keyPairResult.publicKey);

        const payload = 'register_fingerprint';
        const signatureResult = await rnBiometrics.createSignature({
          promptMessage: 'Sign in with fingerprint',
          payload: payload,
        });

        if (signatureResult.success) {
          const registerData: RegisterRequest = {
            name: formState.name,
            email: formState.email,
            password: formState.password,
            fingerprintId: signatureResult.signature,
          };

          const response = await authService.register(registerData);

          if ('statusCode' in response) {
            setError(response.message);
          } else {
            setShowSuccessModal(true);
            setTimeout(() => {
              setShowSuccessModal(false);
              resetForm();
              navigation.navigate('Login');
            }, 1500);
          }
        } else {
          setError('Failed to create biometric signature');
        }
      } else {
        setError(biometricError || 'Fingerprint authentication failed');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return {
    formState,
    handleChange,
    registerWithFingerprint,
    loading,
    error,
    showSuccessModal,
    setShowSuccessModal,
  };
};

export default useRegister;
