import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ContentLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.shape};
  `}
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient,
  start: { x: 1, y: 0.3 },
  end: { x: 1, y: 1 },
}))`
  padding: ${getStatusBarHeight() + 33}px 0 33px;
`;
