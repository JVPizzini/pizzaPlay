import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;
  align-self: flex-start;

  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.shape};
  `}
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain',
})`
  /* width: 100%; */
  height: ${RFValue(100)}px;
  margin: 50px 70px;
  /* background-color: red;
  /* padding: 0 50px; */
  /* margin: 10px 50px; */
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin: 10px 10px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.shape};
  `}
`;

export const Form = styled.View``;

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient,
  start: { x: 1, y: 0.6 },
  end: { x: 1, y: 1 },
}))`
  flex: 1;
  justify-content: center;
`;
