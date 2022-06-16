import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

//interfaces and types
type ContainerProps = {
  index: number;
};

type StatusProps = {
  status: StatusTypesProps;
};

export type StatusTypesProps = 'Doing' | 'Done' | 'Delivered';

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 50%;
  align-items: center;
  padding: 24px;

  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.colors.background};
  `}
`;

export const Image = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 21px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.title};
  `}
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 11px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

export const StatusContainer = styled.View<StatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${({ theme, status }) =>
    status === 'Doing' &&
    css`
      background-color: ${theme.colors.error};
    `}

  ${({ theme, status }) =>
    status === 'Done' &&
    css`
      background-color: ${theme.colors.sucess};
    `}
  ${({ theme, status }) =>
    status === 'Delivered' &&
    css`
      background-color: ${theme.colors.bookplay_New};
    `}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;

  ${({ status, theme }) =>
    css`
      font-family: ${theme.fonts.regular};
      color: ${status === 'Delivered' ? theme.colors.shape : theme.colors.shape};
    `}
`;
