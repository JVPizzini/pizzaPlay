import styled, { css } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

export type TypeProps = 'primary' | 'secundary';
// interface Props extends TextInputProps {
//   type?: TypeProps;
// }

import { Props } from './';

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary' ? theme.colors.shape : theme.colors.background,
}))<Props>`
  /* flex: 1; */
  width: 100%;

  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  padding: 10px 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    border: 1px solid ${type === 'primary' ? theme.colors.shape : theme.colors.background};
    color: ${type === 'primary' ? theme.colors.shape : theme.colors.title};
  `}
`;
