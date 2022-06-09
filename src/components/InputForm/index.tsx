import React from 'react';
import theme from '@theme/';
import { TextInputProps, KeyboardType } from 'react-native';
import { Control, Controller } from 'react-hook-form';

//Styled-components
import { Container, Error } from './styles';

//Components
import { Input } from '../Input';
import { InputPrice } from '../InputPrice';

//Interfaces and types
import { TypeProps } from '../Input/styles';
export interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  type: TypeProps | 'P'|'M'|'G';
  size?: number;
  typeInput?: KeyboardType;
}

export function InputForm({ control, name, error, type, size, typeInput, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) =>
          typeInput === 'numeric' ? (
            <InputPrice
              {...rest}
              onChangeText={onChange}
              value={value}
              selectionColor={theme.colors.shape}
              type={type}
              style={{ height: size }}
              keyboardType={typeInput}
            />
          ) : (
            <Input
              {...rest}
              onChangeText={onChange}
              value={value}
              selectionColor={theme.colors.shape}
              type={type}
              style={{ height: size }}
            />
          )
        }
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
