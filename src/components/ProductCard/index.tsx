import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

//styles-components
import {
  Container,
  Content,
  Description,
  Image,
  Details,
  Line,
  Name,
  Identification,
} from './styles';

//interfaces and types
export type ProductProps = {
  id: string;
  image: string;
  name: string;
  description: string;
};

type Props = RectButtonProps & { data: ProductProps };

export function ProductCard({ data, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.image }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
          </Identification>

          <Description>{data.description}</Description>
        </Details>
        <Feather name="chevron-right" size={18} color={colors.text} />
      </Content>
      <Line />
    </Container>
  );
}
