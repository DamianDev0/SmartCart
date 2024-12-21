import React, { createContext, useState, useEffect } from 'react';
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      }
    };

    loadAuthState();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signOut, userId, token, setIsAuthenticated, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
