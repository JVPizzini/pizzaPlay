import React from 'react';
import { TouchableOpacityProps } from 'react-native';
//components

//styled-components
import {
  Container,
  Description,
  Image,
  Name,
  StatusContainer,
  StatusLabel,
  StatusTypesProps,
} from './styles';

//interfaces and types
type Props = TouchableOpacityProps & {
  index: number;
};

//assets
import empty from '@assets/empty.png';

export function OrderCard({ index, ...rest }: Props) {
  return (
    <Container index={index}>
      <Image source={empty} />

      <Name>teste nome</Name>

      <Description> mesa 5 qtd: 1</Description>

      <StatusContainer status="Doing">
        <StatusLabel status="Doing">Doing</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
