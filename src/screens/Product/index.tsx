import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Platform, ScrollView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from '@react-navigation/native';

//components
import { ButtomBack } from '@components/ButtomBack';
import { Photo } from '@components/Photo';
import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';

//styled-components
import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCharacters,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

//interface and types
import { ProductNavigationProps } from '@src/@types/navigation/navigation';
interface Props {
  [name: string]: string;
}
interface ProductProps {
  id: string;
  name: string;
  description: string;
  priceP: string;
  priceM: string;
  priceG: string;
  image: string;
}

//form schema
const schema = Yup.object().shape({
  name: Yup.string().required(`People's name is required`),
  description: Yup.string(),
  priceP: Yup.string() /* .required('The value is required') */,
  priceM: Yup.string() /* .required('The value is required') */,
  priceG: Yup.string() /* .required('The value is required') */,
});

export const PIZZAS_COLLECTION = '@pizzaplay:registers';

export function Product() {
  const [dataProduct, setDataProduct] = useState<ProductProps>({} as ProductProps);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister(form: Props) {
    setIsLoading(true);

    const { name, description, priceP, priceM, priceG } = form;

    const newRegister: ProductProps = {
      id: String(uuid.v4()),
      name: name,
      description: description,
      priceP: priceP,
      priceM: priceM,
      priceG: priceG,
      image: image,
    };

    try {
      const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      const pizzaList = [...currentData, newRegister];
      await AsyncStorage.setItem(PIZZAS_COLLECTION, JSON.stringify(pizzaList));

      // setDataProduct(newRegister);
    } catch (error) {
      console.log(error);
    }

    setImage('');
    reset();

    setTimeout(() => {
      Alert.alert('Registred 😘');
      setIsLoading(false);
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
        <Header>
          <ButtomBack onPress={handleBack} />
          <Title>Register</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Upload>
            <Photo uri={dataProduct.image ? dataProduct.image : image} />
            <PickImageButton title={`Upload`} type="secundary" onPress={handlePickerImage} />
          </Upload>

          <Form>
            <InputGroup>
              <Label>Nome</Label>
              <InputForm
                name="name"
                control={control}
                placeholder="Name"
                autoCapitalize="sentences"
                autoCorrect
                type="secundary"
                value={dataProduct.name}
                error={errors.name && errors.name.message}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Descrição</Label>
                <MaxCharacters>0 de 60 caracteres</MaxCharacters>
              </InputGroupHeader>
              <InputForm
                name="description"
                multiline
                control={control}
                placeholder="Description"
                autoCapitalize="sentences"
                autoCorrect={false}
                type="secundary"
                size={80}
                value={dataProduct.description}
                //  error={errors.email && errors.email.message}
              />
            </InputGroup>

            <InputGroup>
              <Label>Tamanhos e preços</Label>

              <InputForm
                name="priceP"
                control={control}
                autoCapitalize="sentences"
                type="P"
                size={80}
                typeInput="numeric"
                value={dataProduct.priceP}
              />
              <InputForm
                name="priceM"
                control={control}
                autoCapitalize="sentences"
                type="M"
                size={80}
                typeInput="numeric"
                value={dataProduct.priceM}
              />
              <InputForm
                name="priceG"
                control={control}
                autoCapitalize="sentences"
                type="G"
                size={80}
                typeInput="numeric"
                value={dataProduct.priceG}
              />
            </InputGroup>
            <Button
              title="Register "
              type="secundary"
              onPress={handleSubmit(handleRegister)}
              isLoading={isLoading}
            />
          </Form>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
