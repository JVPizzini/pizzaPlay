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

//assets
import { empty } from '@assets/empty.png';

export function ProductCard({ data, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.image ? data.image : empty }} />

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
