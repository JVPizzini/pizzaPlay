import React from 'react';
import { TextInputProps, KeyboardType } from 'react-native';

import { Container, TypeProps } from './styles';

export interface Props extends TextInputProps {
  type?: TypeProps | 'P'|'M'|'G';
}

export function Input({ type = 'primary',...rest }: Props) {
  return <Container type={type} {...rest} />;
}
