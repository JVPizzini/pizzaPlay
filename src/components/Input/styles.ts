import styled, { css } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

export type TypeProps = 'primary' | 'secundary';

type Props = TextInputProps & {
  type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor: type === 'primary' ? theme.colors.shape : theme.colors.bookplay_New,
}))<Props>`
  /* flex: 1; */
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0px;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    border: 1px solid ${theme.colors.shape};
    color: ${type === 'primary' ? theme.colors.shape : theme.colors.bookplay_New};
  `}
`;
