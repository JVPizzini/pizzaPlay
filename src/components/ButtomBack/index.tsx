import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

//styled-components
import { Container } from './styles';

//interfaces and types
interface Props extends RectButtonProps {
  onPress: () => void;
}

export function ButtomBack({ ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" size={RFValue(18)} color={theme.colors.shape} />
    </Container>
  );
}
