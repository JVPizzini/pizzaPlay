import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//components
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomMenu } from '@components/BottomMenu';
import { RFValue } from 'react-native-responsive-fontsize';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.bookplay_New,
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: RFValue(47),
          paddingVertical: Platform.OS === 'ios' ? RFValue(20) : 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <BottomMenu title="List" color={color} />,
        }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Production" color={color} notification="5" />
          ),
        }}
      />
    </Navigator>
  );
}
