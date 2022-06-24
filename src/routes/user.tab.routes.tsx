import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
const { Navigator, Screen } = createBottomTabNavigator();

//components
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomMenu } from '@components/BottomMenu';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

//interfaces and types
import { OrderProps } from '@components/OrderCard';

import { ORDERS_COLLECTION } from '@screens/Order';

export function UserTabRoutes() {
  const { colors } = useTheme();
  const [newOrders, setNewOrders] = useState([]);

  async function notificationNewOrders() {
    const data = await AsyncStorage.getItem(ORDERS_COLLECTION);
    const currentData = data ? JSON.parse(data) : [];
    if (currentData) {
      const filteredList = currentData.filter((item: OrderProps) => item.status === 'Doing');
      if (filteredList) {
        setNewOrders(filteredList);
      }
    }
  }

  useEffect(() => {
    notificationNewOrders();
  }, []);

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
        listeners={{ focus: () => notificationNewOrders() }}
      />
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Production" color={color} notification={String(newOrders.length)} />
          ),
        }}
      />
    </Navigator>
  );
}
