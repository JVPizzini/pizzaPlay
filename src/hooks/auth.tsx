import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  password: string;
}

type AuthContextDate = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotEmail: () => Promise<void>;
  isLoggin: boolean;
  user: User;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@pizzaply:user';

export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggin, setIsloggin] = useState(false);

  const [user, setUser] = useState<User>({} as User);
  const [password, setpassword] = useState('');

  async function signIn(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };

    if (user.email != 'admin' || user.password != 'bookplay') {
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
        Alert.alert('login', 'Entrou 😉');
      }, 3000);
    }
  }

  async function loadUserStorageDate() {
    setIsloggin(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      // console.log(userData);
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
        password,
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
