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
  data: OrderProps;
};
export interface OrderProps {
  id: string;
  size: string;
  quantity: string;
  name: string;
  amount: string;
  tableNumber: string;
  status: StatusTypesProps;
  waiter_id: string;
  image: string;
}

export function OrderCard({ index, data, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: data.image }} />

      <Name>{data.name}</Name>

      <Description>{`Mesa ${data.tableNumber} | Qtd: ${data.quantity}`}</Description>

      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{data.status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
}
