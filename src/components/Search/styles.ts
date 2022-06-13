import React from 'react';
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type ButtonProps = RectButtonProps & {
  children: React.ReactNode;
};

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: -30px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;

  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
    border: 1px solid ${theme.colors.background};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 52px;
  padding-left: 12px;

  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 7px;
`;

export const Button = styled(RectButton)<ButtonProps>`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bookplay_Old};
  border-radius: 18px;
  margin-left: 7px;
`;
