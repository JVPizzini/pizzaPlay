import { OrderCard } from '@components/OrderCard';
import React from 'react';
import { FlatList } from 'react-native';

import { Container, Header, Title } from './styles';

export function Orders() {

  
  async function 


  return (
    <Container>
      <Header>
        <Title>Orders done</Title>
      </Header>

      <FlatList
        data={['1', '2', '3']}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125 }}
      />
    </Container>
  );
}
