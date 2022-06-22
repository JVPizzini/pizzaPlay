import React, { useState } from 'react';
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
  type: TypeProps | 'P' | 'M' | 'G';
  size?: number;
  typeInput?: KeyboardType;
  valor?: string;
}

export function InputForm({ control, name, error, type, size, typeInput, ...rest }: Props) {
  
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value = rest.value } }) =>
          typeInput === 'numeric' ? (
            <InputPrice
              {...rest}
              value={value}
              onChangeText={ onChange}
              selectionColor={theme.colors.shape}
              type={type}
              style={{ height: size }}
              keyboardType={typeInput}
              onAccessibilityEscape={value}
              
            />
          ) : (
            <Input
              {...rest}
              value={value}
              onChangeText={onChange}
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
