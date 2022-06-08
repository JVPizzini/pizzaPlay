import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

//Styled-components
import { Container, Error } from './styles';

//Components
import { Input } from '../Input';
import theme from '@theme/';

//Interfaces and types
import { TypeProps } from '../Input/styles';
interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  type: TypeProps;

}

export function InputForm({ control, name, error, type,...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
            // placeholderTextColor={theme.colors.text}
            selectionColor={theme.colors.shape}
            type={type}

          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
      
    </Container>
  );
}
