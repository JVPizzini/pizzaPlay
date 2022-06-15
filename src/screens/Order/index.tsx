import React, { useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//components
import { ButtomBack } from '@components/ButtomBack';
import { RadioButtom } from '@components/RadioButtom';
import { Input } from '@src/components/Input';

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
import { PIZZA_TYPES } from '../../utils/pizzaTypes';

//assets
import empty from '@assets/empty.png';
import { Button } from '@src/components/Button';

export function Order() {
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ContentScroll>
          <Header>
            <ButtomBack onPress={() => {}} style={{ marginBottom: 108 }} />
          </Header>
          <Photo source={empty} />

          <Form>
            <Title>{'pizza.name'}</Title>
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
                <Input type="secundary" keyboardType="numeric" />
              </InputGroup>
              <InputGroup>
                <Label>Amount</Label>
                <Input type="secundary" keyboardType="numeric" />
              </InputGroup>
            </FormRow>

            <Price>Price to R$ {'amount'}</Price>

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
