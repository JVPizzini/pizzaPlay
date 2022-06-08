import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Title, Load, TypeProps } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
  onPress: () => void;
}

export function Button({ title, type = 'primary', isLoading, ...rest }: Props) {
  return (
    <Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}
