import React from 'react';
import { TextInputProps, KeyboardType } from 'react-native';

//components

//styled-components
import { Container, Input, Size, Label } from './styles';

//interface and types
interface Props extends TextInputProps {
  type: string;
  typInput?: KeyboardType;
}

export function InputPrice({ type, typInput, ...rest }: Props) {
  return (
    <Container>
      <Size>
        <Label>{type}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType={typInput} {...rest} />
    </Container>
  );
}
