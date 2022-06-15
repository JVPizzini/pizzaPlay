import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export function UserStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="product" component={Product} />
      <Screen name="signin" component={SignIn} />
    </Navigator>
  );
}