import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Button } from '@components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.shape};
  `}
`;

export const DeleteLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.shape};
  `}
`;

export const Upload = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
`;

export const PickImageButton = styled(Button)`
  max-width: ${RFValue(90)}px;
  margin-left: 90px;
`;

export const Form = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;

export const Label = styled.Text`
  margin-bottom: 12px;
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaxCharacters = styled.Text`
  font-size: ${RFValue(10)}px;
  margin-bottom: 12px;

  ${({ theme }) => css`
  font-family: ${theme.fonts.regular}
  color: ${theme.colors.text}
  `}
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient,
  start: { x: 1, y: 0.3 },
  end: { x: 1, y: 1 },
}))`
  width: 100%;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;
