import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
//styles
import { Container, InputArea, Button, Input, ButtonClear } from './styles';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

export function Search({ ...rest }: RectButtonProps) {
  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input />
        <ButtonClear>
          <MaterialIcons name="close" size={18} color={theme.colors.dark_1} />
        </ButtonClear>
      </InputArea>
      <Button {...rest}>
        <MaterialIcons name="search" size={24} color={theme.colors.shape} />
      </Button>
    </Container>
  );
}
