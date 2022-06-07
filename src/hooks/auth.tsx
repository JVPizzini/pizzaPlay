import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Alert } from 'react-native';

type AuthContextDate = {
  signIn: (email: string, password: string) => Promise<void>;
  isLoggin: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextDate);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggin, setIsloggin] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('login', 'Please, correctly fill in the login fields 😉');
    }

    if (email != 'admin') {
      return Alert.alert('login', 'sorry but your credentials are wrong 😢');
    }

    if (password != 'bookplay') {
      return Alert.alert('login', 'sorry but your credentials are wrong 😢');
    }

    try {
      setIsloggin(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsloggin(false);
      }, 3000);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isLoggin,
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
