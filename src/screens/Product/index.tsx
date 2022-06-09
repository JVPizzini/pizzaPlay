import React, { useState } from 'react';
import { Keyboard, Platform, ScrollView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//components
import { ButtomBack } from '@components/ButtomBack';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

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
import { InputPrice } from '@components/InputPrice';
import { useForm } from 'react-hook-form';
import { InputForm } from '@components/InputForm';

//interface and types
interface DataProps {
  [name: string]: string;
}

//form schema
const schema = Yup.object().shape({
  name: Yup.string().required(`People's name is required`),
  description: Yup.string(),
  price: Yup.object({
    priceP: Yup.string() /* .required('The value is required') */,
    priceM: Yup.string() /* .required('The value is required') */,
    priceG: Yup.string() /* .required('The value is required') */,
  }),

  image: Yup.string(),
});

export function Product() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [image, setImage] = useState('');

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

  async function handleRegister(form: DataProps) {
    const newRegister = {
      name: form.name,
      description: form.description,
      price: form.price,
      // priceP: String(form.priceP),
      // priceM: String(form.priceM),
      // priceG: String(form.priceG),
      image: image,
    };

    try {
      console.log(newRegister);
    } catch (error) {
      console.log(error);
    }

    reset();
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header>
          <ButtomBack />
          <Title>Register</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Upload>
            <Photo uri={image} />
            <PickImageButton title={`Upload`} type="secundary" onPress={handlePickerImage} />
          </Upload>

          <Form>
            <InputGroup>
              <Label>Nome</Label>
              {/* <Input type="secundary" /> */}
              <InputForm
                name="name"
                control={control}
                placeholder="Name"
                autoCapitalize="sentences"
                autoCorrect
                type="secundary"
                error={errors.name && errors.name.message}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <Label>Descrição</Label>
                <MaxCharacters>0 de 60 caracteres</MaxCharacters>
              </InputGroupHeader>

              {/* <Input type="secundary" multiline maxLength={60} style={{ height: 55 }} /> */}
              <InputForm
                name="description"
                control={control}
                placeholder="Description"
                autoCapitalize="sentences"
                autoCorrect={false}
                type="secundary"
                size={80}
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
              />
              <InputForm
                name="priceM"
                control={control}
                autoCapitalize="sentences"
                type="M"
                size={80}
                typeInput="numeric"
              />
              <InputForm
                name="priceG"
                control={control}
                autoCapitalize="sentences"
                type="G"
                size={80}
                typeInput="numeric"
              />
            </InputGroup>
            <Button title="Register " type="secundary" onPress={handleSubmit(handleRegister)} />
          </Form>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
