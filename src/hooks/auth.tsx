import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  login: string;
  password: string;
  permission: string;
}

type AuthContextDate = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotEmail: () => Promise<void>;
  isLoggin: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@pizzaplay:user';
export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggin, setIsloggin] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [password, setPassword] = useState('');

  async function signIn(login: string, password: string) {
    const user: User = {
      login: login,
      password: password,
      permission: login,
    };

    if (user.login != 'admin' || user.password != 'bookplay') {
      return Alert.alert('login', 'sorry but your credentials are wrong 😢');
    }

    try {
      setIsloggin(true);

      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsloggin(false);
      }, 3000);
    }
  }

  async function loadUserStorageDate() {
    setIsloggin(true);
    await AsyncStorage.removeItem(USER_COLLECTION);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;

      setUser(userData);
    }
    setIsloggin(false);
  }

  async function signOut() {
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser({} as User);
  }

  async function forgotEmail() {
    setIsloggin(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    const userData = storedUser && (JSON.parse(storedUser) as User);

    if (userData) {
      Alert.alert(`Password: ${userData.password}💙`);
    } else {
      Alert.alert(`Password: There isn't user logged in 😢`);
    }
    setIsloggin(false);
  }

  useEffect(() => {
    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLoggin,
        user,
        forgotEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
