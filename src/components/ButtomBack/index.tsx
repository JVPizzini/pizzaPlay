import React from 'react';
// import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

//styled-components
import { Container } from './styles';

export function ButtomBack() {
  const theme = useTheme();
  return (
    <Container >
      <MaterialIcons name="chevron-left" size={18} color={theme.colors.shape} />
    </Container>
  );
}
