import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

//styles
import { Container, InputArea, Button, Input, ButtonClear } from './styles';

//interfaces and types
type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
  dataSearched: string
};

export function Search({ onSearch, onClear,dataSearched, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Search..." {...rest}/>
        <ButtonClear onPress={onClear}>
          {!!dataSearched && <MaterialIcons name="close" size={18} color={colors.dark_1} />}
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        <MaterialIcons name="search" size={24} color={colors.shape} />
      </Button>
    </Container>
  );
}
