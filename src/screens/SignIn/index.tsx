import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@hooks/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';

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
} from './styles';

//assets
import bookplay from '@assets/bookplay.png';

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { signIn, isLoggin } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSignIn(email: string, password: string) {
    signIn(email, password);
  }
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Brand source={bookplay} />
        <Content>
          <Title>Login</Title>
          {/* <Input placeholder="E-mail" type="secundary" autoCorrect={false} autoCapitalize="none" />
          <Input placeholder="Senha" type="secundary" secureTextEntry /> */}
          <InputForm
            name="Email"
            control={control}
            placeholder="Email"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
            type="primary"
          />
          <InputForm
            name="Password"
            control={control}
            placeholder="Password"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
            secureTextEntry
            type="primary"
          />
          <ForgotPasswordButton>
            <ForgotPasswordLabel>forgot password?</ForgotPasswordLabel>
          </ForgotPasswordButton>
          <Button title="SignIn" type="primary" isLoading={true} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
