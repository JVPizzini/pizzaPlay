import { Button } from '@components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  height: 60px;
  width: 60px;
  margin-right: 12px;
  border-radius: 30px;
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.background};
`;

export const MenuTitle = styled.Text`
  font-size: 20px;
  line-height: 20px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const MenuItemsNumber = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const GreetingText = styled.Text`
  font-size: 20px;

  ${({ theme }) => css`
  font-family: ${theme.fonts.regular}
  color: ${theme.colors.shape}
  `}
`;

export const NewProductButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.colors.gradient,
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;
