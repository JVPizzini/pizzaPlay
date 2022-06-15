import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
//interfaces and types
export type RadioButtomProps = {
  selected: boolean;
  children?: React.ReactNode;
};

export const Container = styled(TouchableOpacity)<RadioButtomProps>`
  width: 104px;
  height: 82px;
  border-radius: 8px;
  padding: 14px 16px;
  align-items: center;
  justify-content: center;

  ${({ theme, selected }) =>
    css`
      border: 1px solid ${selected ? theme.colors.bookplay_New : theme.colors.text};
      background-color: 1px solid ${selected ? theme.colors.sucess_light : theme.colors.attention};
    `};
`;

export const Title = styled.Text`
  font-size: 16px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.dark_1};
  `}
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.title};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bookplay_New};
`;
