import React from 'react';
import theme from './src/theme';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//hooks
import { AuthProvider } from '@hooks/auth';

import {
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  useFonts,
} from '@expo-google-fonts/lato';

//screens
import { SignIn } from '@screens/SignIn';
import { Product } from '@screens/Product';
import { Home } from '@screens/Home';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <AuthProvider>
          {/* <SignIn /> */}
          {/* <Product /> */}
          <Home />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
