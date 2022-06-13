import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

//styled-components
import { Container } from './styles';

//interfaces and types
interface Props extends TouchableOpacityProps {
  onPress: () => void;
}

export function ButtomBack({ onPress, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <MaterialIcons name="chevron-left" size={18} color={theme.colors.shape} />
    </Container>
  );
}
