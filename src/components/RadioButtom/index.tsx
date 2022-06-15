import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { RadioButtomProps, Container, Radio, Selected, Title } from './styles';

//interfaces and types
type Props = TouchableOpacityProps &
  RadioButtomProps & {
    title: string;
    onPress: () => void;
  };

export function RadioButtom({ selected = false, title, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} selected={selected}>
      <Radio>{selected && <Selected />}</Radio>

      <Title>{title}</Title>
    </Container>
  );
}
