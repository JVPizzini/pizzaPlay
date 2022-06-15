import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export type TypeProps = 'primary' | 'secundary';

type ContainerProps = {
  type: TypeProps;
  children?: React.ReactNode;
};

export const Container = styled(RectButton)<ContainerProps>`
  flex: 1;
  max-height: ${RFValue(56)}px;
  min-height: ${RFValue(56)}px;
  border-radius: ${RFValue(12)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, type }) =>
    type === 'primary' ? theme.colors.bookplay_Old : theme.colors.bookplay_New};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
  `}
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.shape,
}))``;
