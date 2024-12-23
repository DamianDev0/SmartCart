import {useState, useEffect, useContext} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import authService from '../../../services/authService';
import {LoginRequest} from '../../../interfaces/auth.interface';
import {ApiError} from '../../../utils/errorHandler';
import useNavigation from '../../../hooks/useNavigation';
import AuthContext from '../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    fingerprintId: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const {setToken, setUserId, setIsAuthenticated} = useContext(AuthContext);
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

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginData: LoginRequest = {
        email: formState.email,
        password: formState.password,
        fingerprintId: formState.fingerprintId,
      };

      const response = await authService.login(loginData);

      if ('statusCode' in response) {
        setError(response.message);
      } else {
        setToken(response.data.accessToken);
        setUserId(response.data.id);
        setIsAuthenticated(true);
        navigation.navigate('Home');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const loginWithFingerprint = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isBiometricSupported) {
        setError('Biometric authentication is not supported on this device.');
        setLoading(false);
        return;
      }

      const publicKey = await AsyncStorage.getItem('publicKey');
      if (!publicKey) {
        setError('Biometric key not found. Please register first.');
        setLoading(false);
        return;
      }

      const {success, error: biometricError} = await rnBiometrics.simplePrompt({
        promptMessage: 'Scan your fingerprint to login',
      });

      if (success) {
        const payload = 'register_fingerprint';
        const signatureResult = await rnBiometrics.createSignature({
          promptMessage: 'Sign in with fingerprint',
          payload: payload,
        });

        if (signatureResult.success) {
          const loginData: LoginRequest = {
            email: formState.email,
            password: '',
            fingerprintId: signatureResult.signature,
          };

          const response = await authService.login(loginData);

          if ('statusCode' in response) {
            setError(response.message);
          } else {
            setToken(response.data.accessToken);
            setUserId(response.data.id);
            setIsAuthenticated(true);
            navigation.navigate('Home');
          }
        } else {
          setError('Failed to create biometric signature');
        }
      } else {
        setError(biometricError || 'Fingerprint authentication failed');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return {
    formState,
    handleChange,
    login,
    loginWithFingerprint,
    loading,
    error,
    isBiometricSupported,
  };
};

export default useLogin;
