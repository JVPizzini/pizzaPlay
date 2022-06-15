import styled, { css } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

export type TypeProps = 'primary' | 'secundary';
// interface Props extends TextInputProps {
//   type?: TypeProps;
// }

import { Props } from './';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary' ? theme.colors.shape : theme.colors.background,
}))<Props>`
  /* flex: 1; */
  width: 100%;

  background-color: transparent;
  border-radius: ${RFValue(12)}px;
  font-size: ${RFValue(14)}px;
  padding: 10px 20px;
  margin-bottom: ${RFValue(16)}px;

  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    border: 1px solid ${type === 'primary' ? theme.colors.shape : theme.colors.background};
    color: ${type === 'primary' ? theme.colors.shape : theme.colors.title};
  `}
`;
