import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

//interfaces and types
type TitleProps = {
  color: string;
};

type NotificationProps = {
  noNotifications: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background-color: red; */

  width: ${RFValue(100)}px;
  height: ${RFValue(50)}px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(15)}px;

  ${({ theme, color }) => css`
    font-family: ${theme.fonts.regular};
    color: ${color};
  `}
`;

export const Notification = styled.View<NotificationProps>`
  top: 5px;
  right: 0px;
  height: ${RFValue(15)}px;
  border-radius: ${RFValue(12)}px;
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(8)}px;
  position: absolute;
  ${({ noNotifications, theme }) =>
    !noNotifications &&
    css`
      background-color: ${theme.colors.bookplay_Old};
    `}

  ${({ noNotifications, theme }) =>
    noNotifications &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.colors.shape};
    `}
`;

export const Quantity = styled.Text<NotificationProps>`
  font-size: ${RFValue(10)}px;

  ${({ noNotifications, theme }) =>
    noNotifications &&
    css`
      font-family: ${theme.fonts.regular};
      color: ${theme.colors.shape};
    `};
`;
