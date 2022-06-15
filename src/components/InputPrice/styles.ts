import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(56)}px;
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(12)}px;
  margin-bottom: ${RFValue(8)}px;
  flex-direction: row;
  align-items: center;
`;

export const Size = styled.View`
  height: ${RFValue(56)}px;
  width: ${RFValue(56)}px;
  justify-content: center;
  align-items: center;
  border-right-width: ${RFValue(1)}px;
  border-right-color: ${({ theme }) => theme.colors.background};
  margin-right: ${RFValue(18)}px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  margin: ${RFValue(7)}px;
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    color: ${theme.colors.text};
  `}
`;
