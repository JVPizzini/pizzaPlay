import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Platform, ScrollView, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

//components
import { ButtomBack } from '@components/ButtomBack';
import { Photo } from '@components/Photo';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';

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
  size: {
    p: string;
    m: string;
    g: string;
  };
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
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceP, setPriceP] = useState('');
  const [priceM, setPriceM] = useState('');
  const [priceG, setPriceG] = useState('');
  const [image, setImage] = useState('');

  const { id } = route.params as ProductNavigationProps;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleBack() {
    navigation.goBack();
  }
  async function handleDeleteProduct() {
    const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
    const currentData = data ? JSON.parse(data) : [];
    const filteredList = currentData.filter((item: ProductProps) => item.id != id);

    try {
      await AsyncStorage.removeItem(PIZZAS_COLLECTION);
      await AsyncStorage.setItem(PIZZAS_COLLECTION, JSON.stringify(filteredList));
      Alert.alert('Deleted', 'Product deleted successfully');
    } catch (error) {
      return console.log(error);
    }

    navigation.goBack();
  }
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
  async function handleRegister() {
    if (!name.trim()) {
      return Alert.alert('Register', 'Name please');
    }
    if (!description.trim()) {
      return Alert.alert('Register', 'Name please');
    }
    if (!priceP.trim() || !priceM.trim() || !priceG.trim()) {
      return Alert.alert('Register', 'We need prices please');
    }
    if (!image.trim()) {
      return Alert.alert('Register', 'We need image');
    }

    setIsLoading(true);

    const newRegister: ProductProps = {
      id: String(uuid.v4()),
      name: name,
      description: description,
      size: {
        p: priceP,
        m: priceM,
        g: priceG,
      },
      image: image,
    };

    try {
      const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      let newList;
      if (id) {
        if (currentData) {
          newList = currentData.filter((item: ProductProps) => item.id != id);
        }
      }

      setDataProduct(newRegister);

      const pizzaList = newList ? [...newList, newRegister] : [...currentData, newRegister];

      await AsyncStorage.setItem(PIZZAS_COLLECTION, JSON.stringify(pizzaList))
        .then(() => navigation.navigate('home'))
        .then(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }

    setName('');
    setDescription('');
    setPriceP('');
    setPriceM('');
    setPriceG('');
    setImage('');
  }
  async function loadDataItem() {
    const product: ProductProps = {
      id: '',
      name: '',
      description: '',
      size: {
        p: '',
        m: '',
        g: '',
      },
      image: '',
    };

    if (id) {
      const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
      const currentData = data ? JSON.parse(data) : [];

      if (currentData) {
        const currentDataFiltered = currentData.find((item: ProductProps) => item.id === id);
        setDataProduct(currentDataFiltered);
      }
    } else {
      setDataProduct(product);
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
          {id ? (
            <TouchableOpacity onPress={handleDeleteProduct}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Upload>
            <Photo uri={dataProduct.image ? dataProduct.image : image} />
            {!id && <PickImageButton title="Upload" type="secundary" onPress={handlePickerImage} />}
          </Upload>

          <Form>
            <InputGroup>
              <Label>Name</Label>
              <Input
                type="secundary"
                placeholder="Name"
                onChangeText={setName}
                value={name ? name : dataProduct.name}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Description</Label>
                <MaxCharacters>0 de 60 caracteres</MaxCharacters>
              </InputGroupHeader>
              <Input
                type="secundary"
                placeholder="Description"
                multiline
                maxLength={60}
                style={{ height: 80 }}
                onChangeText={setDescription}
                value={description ? description : dataProduct.description}
              />
            </InputGroup>

            <InputGroup>
              <Label>Tamanhos e preços</Label>
              <InputPrice
                typeInput="numeric"
                type="P"
                onChangeText={setPriceP}
                value={priceP ? priceP : dataProduct.size?.p}
              />
              <InputPrice
                typeInput="numeric"
                type="M"
                onChangeText={setPriceM}
                value={priceM ? priceM : dataProduct.size?.m}
              />
              <InputPrice
                typeInput="numeric"
                type="G"
                onChangeText={setPriceG}
                value={priceG ? priceG : dataProduct.size?.g}
              />
            </InputGroup>
            {!id && (
              <Button
                title="Register "
                type="secundary"
                onPress={handleRegister}
                isLoading={isLoading}
              />
            )}
          </Form>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
