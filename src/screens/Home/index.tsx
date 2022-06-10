import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

//components
import { Search } from '@components/Search';

//styles-components
import { Container, Header, Greeting, GreetingText, GreetingEmoji } from './styles';

//assets
import gugu from '@assets/gugu.png';
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export function Home() {
  const { colors } = useTheme();

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={gugu} />
          <GreetingText>ola, admin</GreetingText>
        </Greeting>
        <TouchableOpacity>
          <MaterialIcons name="logout" color={colors.shape} size={24} />
        </TouchableOpacity>
      </Header>
        <Search />
    </Container>
  );
}
