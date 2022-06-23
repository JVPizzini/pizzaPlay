import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORDERS_COLLECTION } from '@screens/Order';
import { useTheme } from 'styled-components/native';
import uuid from 'react-native-uuid';

//components
import { OrderCard, OrderProps } from '@components/OrderCard';

//styled-componets
import { Container, Header, Title, ContentLoading } from './styles';
import { useFocusEffect } from '@react-navigation/native';

//assets
import { empty } from '@assets/empty.png';

export function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState<OrderProps[]>([]);
  const { colors } = useTheme();

  async function loadingOrders() {
    setIsLoading(true);

    try {
      const data = await AsyncStorage.getItem(ORDERS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      // const newOrder: OrderProps = {
      //   id: String(uuid.v4()),
      //   size: 'g',
      //   amount: '123',
      //   tableNumber: '3',
      //   quantity: '4',
      //   name: 'teste chumbado',
      //   status: 'Delivered',
      //   waiter_id: 'teste',
      //   image: empty,
      // };

      // const newCurrentData = [...currentData, newOrder];

      setOrderList(currentData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function productDelivered(id: string) {
    const productFiltered = orderList.find((item: OrderProps) => item.id === id);

    if (productFiltered) {
      const productEdited = {
        id: productFiltered.id,
        size: productFiltered.size,
        amount: productFiltered.id,
        tableNumber: productFiltered.tableNumber,
        quantity: productFiltered.quantity,
        name: productFiltered.name,
        status: 'Delivered',
        waiter_id: productFiltered.waiter_id,
        image: productFiltered.image,
      };

      const filteredList = orderList.filter((item: OrderProps) => item.id != id);

      const newList = [...filteredList, productEdited];
      await AsyncStorage.removeItem(ORDERS_COLLECTION);
      await AsyncStorage.setItem(ORDERS_COLLECTION, JSON.stringify(newList));

      loadingOrders();
    }
  }

  function handlePizzaDelivered(id: string) {
    Alert.alert('Product', 'Was the product delivered?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => productDelivered(id),
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      loadingOrders();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Orders done</Title>
      </Header>

      {isLoading ? (
        <ContentLoading>
          <ActivityIndicator color={colors.bookplay_New} size={'large'} />
        </ContentLoading>
      ) : (
        <FlatList
          data={orderList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <OrderCard
              index={index}
              data={item}
              disabled={item.status === 'Delivered'}
              onPress={() => handlePizzaDelivered(item.id)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 125 }}
        />
      )}
    </Container>
  );
}
