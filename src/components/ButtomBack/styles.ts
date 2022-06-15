import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type ContainerProps = {
  children?: React.ReactNode;
};

export const Container = styled.TouchableOpacity/* (RectButton)<ContainerProps> */ `
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(12)}px;

  border: 1px solid ${({ theme }) => theme.colors.shape};
`;
