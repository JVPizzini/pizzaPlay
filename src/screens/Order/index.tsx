import React, { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderNavigationProps } from '@src/@types/navigation/navigation';
import { PIZZAS_COLLECTION } from '@screens/Product';

//components
import { ButtomBack } from '@components/ButtomBack';
import { RadioButtom } from '@components/RadioButtom';
import { Input } from '@components/Input';
import { ProductProps } from '@components/ProductCard';

//styled-components
import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from './styles';

//assets
import empty from '@assets/empty.png';
import { Button } from '@src/components/Button';

//interfaces and types
import { PIZZA_TYPES } from '../../utils/pizzaTypes';
type DataItens = ProductProps & {
  size: {
    [key: string]: number;
  };
};

export function Order() {
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState<DataItens>({} as DataItens);
  const [qtd, setQtd] = useState(0);
  const [tableNumber, setTableNumber] = useState('');

  const amount = size ? dataProduct.size[size] * qtd : '0,00';
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function loadDataItem() {
    if (id) {
      const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      if (currentData) {
        const currentDataFiltered = currentData.find((item: ProductProps) => item.id === id);
        setDataProduct(currentDataFiltered);
        console.log(currentDataFiltered);
      }
    }
  }

  useEffect(() => {
    loadDataItem();
  }, [id]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ContentScroll>
          <Header>
            <ButtomBack onPress={handleBack} style={{ marginBottom: 108 }} />
          </Header>
          <Photo source={{ uri: dataProduct.image }} />

          <Form>
            <Title>{dataProduct.name}</Title>
            <Label>Select a size</Label>
            <Sizes>
              {PIZZA_TYPES.map((item) => (
                <RadioButtom
                  key={item.id}
                  title={item.title}
                  onPress={() => setSize(item.id)}
                  selected={size === item.id}
                />
              ))}
            </Sizes>

            <FormRow>
              <InputGroup>
                <Label>Table number</Label>
                <Input type="secundary" keyboardType="numeric" onChangeText={setTableNumber} />
              </InputGroup>
              <InputGroup>
                <Label>Amount</Label>
                <Input
                  type="secundary"
                  keyboardType="numeric"
                  onChangeText={(value) => setQtd(Number(value))}
                />
              </InputGroup>
            </FormRow>

            <Price>Price to R$ {amount}</Price>

            <Button
              onPress={() => {}}
              title="Register order"
              isLoading={isLoading}
              type="secundary"
            />
          </Form>
        </ContentScroll>
      </Container>
    </TouchableWithoutFeedback>
  );
}
