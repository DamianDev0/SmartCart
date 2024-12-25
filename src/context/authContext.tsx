// AuthContext.js
import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthContextProps,
  AuthProviderProps,
} from '../interfaces/auth.interface';

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  signOut: async () => {},
  userId: null,
  token: null,
  setIsAuthenticated: () => {},
  setToken: () => {},
  setUserId: () => {},
});

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedIsAuthenticated = await AsyncStorage.getItem(
        'isAuthenticated',
      );

      if (storedToken && storedUserId && storedIsAuthenticated === 'true') {
        setToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      } else {
      }
    };

    loadAuthState();
  }, []);

  useEffect(() => {
    const saveAuthState = async () => {
      await AsyncStorage.setItem('authToken', token || '');
      await AsyncStorage.setItem('userId', userId || '');
      await AsyncStorage.setItem(
        'isAuthenticated',
        isAuthenticated ? 'true' : 'false',
      );
    };

    saveAuthState();
  }, [token, userId, isAuthenticated]);

  const signOut = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('isAuthenticated');
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signOut,
        userId,
        token,
        setIsAuthenticated,
        setToken,
        setUserId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
