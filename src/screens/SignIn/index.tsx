import React, { useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@hooks/auth';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Control, Controller } from 'react-hook-form';

//Components
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { InputForm } from '@components/InputForm';

//styled-components
import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Form,
} from './styles';

//assets
import bookplay from '@assets/bookplay.png';

//interface and types
interface FormData {
  [email: string]: string;
}

export function SignIn() {
  const navigation = useNavigation();

  const schema = Yup.object().shape({
    email: Yup.string().required('The email is required'),
    password: Yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { signIn, isLoggin, signOut, forgotEmail } = useAuth();

  async function handleSignIn(form: FormData) {
    const user = {
      email: form.email,
      password: form.password,
    };

    try {
      signIn(user.email, user.password);
    } catch (error) {
      console.log(error);
      Alert.alert(`Couldn't signin, email or password incorrect`);
    }
    reset();
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Brand source={bookplay} />
          <Content>
            <Title>Login</Title>
            <Form>
              <InputForm
                name="email"
                control={control}
                placeholder="Email"
                autoCapitalize="sentences"
                autoCorrect={false}
                type="primary"
                size={56}
                error={errors.email && errors.email.message}
              />
              <InputForm
                name="password"
                control={control}
                placeholder="Password"
                autoCapitalize="sentences"
                autoCorrect={false}
                secureTextEntry
                type="primary"
                size={56}
                error={errors.password && errors.password.message}
              />
              <ForgotPasswordButton onPress={forgotEmail}>
                <ForgotPasswordLabel>forgot password?</ForgotPasswordLabel>
              </ForgotPasswordButton>
              <Button
                title="SignIn"
                type="primary"
                isLoading={isLoggin}
                onPress={handleSubmit(handleSignIn)}
              />
            </Form>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
