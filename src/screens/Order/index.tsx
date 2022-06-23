import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Platform, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderNavigationProps } from '@src/@types/navigation/navigation';
import { PIZZAS_COLLECTION } from '@screens/Product';
import * as Yup from 'yup';
import { useAuth } from '@hooks/auth';
import uuid from 'react-native-uuid';

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
  Error,
} from './styles';

//assets
import { Button } from '@src/components/Button';

//interfaces and types
import { PIZZA_TYPES } from '../../utils/pizzaTypes';
import { OrderProps } from '@components/OrderCard';

type DataItens = ProductProps & {
  size: {
    [key: string]: number;
  };
};
// export interface OrderProps {
//   id: string;
//   size: string;
//   quantity: string;
//   name: string;
//   amount: string;
//   tableNumber: string;
//   status: string;
//   waiter_id: string;
//   image: string;
// }
interface Props {
  [name: string]: string;
}

interface ErrorProps {
  key: string;
  msg: string;
}

export const ORDERS_COLLECTION = '@pizzaplay:orders';

export function Order() {
  const schema = Yup.object().shape({
    quantity: Yup.string().required('Quantity is required'),
    tableNumber: Yup.string().required('Number is required'),
  });

  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState<DataItens>({} as DataItens);
  const [quantity, setQuantity] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const navigation = useNavigation();
  const [status, setStatus] = useState<ErrorProps[]>([]);
  const { user } = useAuth();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size && quantity ? String(dataProduct.size[size] * Number(quantity)) : '0,00';

  function handleBack() {
    navigation.goBack();
  }

  async function validate(obj: OrderProps) {
    setStatus([]);

    try {
      await schema.validate(obj, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: ErrorProps[] = error.inner.map((e) => ({
          key: String(e.path),
          msg: e.message,
        }));

        setStatus(errors);
      }
    }
  }

  async function handleRegisterOrder() {
    const newOrder: OrderProps = {
      id: String(uuid.v4()),
      size: size,
      amount: amount,
      tableNumber: tableNumber,
      quantity: quantity,
      name: dataProduct.name,
      status: 'Doing',
      waiter_id: user?.login,
      image: dataProduct.image,
    };

    if (!(await validate(newOrder))) return;

    setIsLoading(true);

    try {
      const data = await AsyncStorage.getItem(ORDERS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      const orderList = [...currentData, newOrder];
      await AsyncStorage.setItem(ORDERS_COLLECTION, JSON.stringify(orderList));
    } catch (error) {
      console.log(error);
    }

    setSize('');
    setQuantity('');
    setTableNumber('');

    setTimeout(() => {
      Alert.alert('Registred 😘');
      setIsLoading(false);
      navigation.navigate('home');
    }, 2000);
  }

  async function loadDataItem() {
    if (id) {
      const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      if (currentData) {
        const currentDataFiltered = currentData.find((item: ProductProps) => item.id === id);
        setDataProduct(currentDataFiltered);
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
                <Input
                  type="secundary"
                  keyboardType="numeric"
                  placeholder="123"
                  onChangeText={setTableNumber}
                  value={tableNumber}
                />
                {!tableNumber &&
                  status.map(
                    (item) => item.key === 'tableNumber' && <Error key={item.key}>{item.msg}</Error>
                  )}
        
              </InputGroup>
              <InputGroup>
                <Label>Amount</Label>
                <Input
                  type="secundary"
                  keyboardType="numeric"
                  placeholder="123"
                  onChangeText={(value) => setQuantity(value)}
                  value={quantity}
                />
                {!quantity &&
                  status.map(
                    (item) => item.key === 'quantity' && <Error key={item.key}>{item.msg}</Error>
                  )}

              </InputGroup>
            </FormRow>
            <Price>Price to R$ {amount}</Price>
            <Button
              onPress={handleRegisterOrder}
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
