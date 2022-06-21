import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Photo = styled.Image`
  width: ${RFValue(240)}px;
  height: ${RFValue(240)}px;

  border-radius: ${RFValue(120)}px;
  align-self: center;
  position: relative;

  top: -120px;
`;

export const ContentScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Sizes = styled.View`
  width: 100%;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  /* padding: 0 30px; */
  margin-bottom: 40px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: -120px;
  padding: 24px;
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const Price = styled.Text`
  font-size: 14px;
  margin: 24px;
  align-self: flex-end;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.sucess};
  `}
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.blue_medium100};
  `};
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin: -30px 10px 10px;
  overflow: scroll;
  align-self: center;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient,
  start: { x: 1, y: 0.3 },
  end: { x: 1, y: 1 },
}))`
  padding: ${getStatusBarHeight() + 33}px 24px 0;
`;
