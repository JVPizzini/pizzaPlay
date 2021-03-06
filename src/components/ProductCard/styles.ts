import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
  margin-right: 20px;
`;

export const Details = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 20px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.title};
  `}
`;

export const Description = styled.Text`
  font-size: 12px;
  line-height: 20px;
  margin-right: 21px;

  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.title};
  `}
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin: 12px 0;
  margin-left: 124px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
`;
