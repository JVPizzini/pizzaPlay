import React, { useCallback, useState } from 'react';
import {
  ActivityIndicatorComponent,
  Alert,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PIZZAS_COLLECTION } from '@screens/Product';

import { useAuth } from '@hooks/auth';

//components
import { Search } from '@components/Search';
import { ProductCard } from '@components/ProductCard';

//styles-components
import {
  Container,
  Header,
  Greeting,
  GreetingText,
  GreetingEmoji,
  MenuHeader,
  MenuItemsNumber,
  MenuTitle,
  NewProductButton,
} from './styles';

//interface and types
interface ProductProps {
  id: string;
  name: string;
  description: string;
  size: {
    p: string;
    m: string;
    g: string;
  };
  image: string;
}

//assets
import gugu from '@assets/gugu.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function Home() {
  const { colors } = useTheme();
  const [dataList, setDataList] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  function handleSearch() {
    const dataFiltered = dataList.filter(
      (item) =>
        item.name.toUpperCase().includes(search.toUpperCase()) ||
        item.description.toUpperCase().includes(search.toUpperCase())
    );
    setDataList(dataFiltered);
  }

  async function searchItems() {
    // AsyncStorage.removeItem(PIZZAS_COLLECTION);
    const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
    const current = data ? JSON.parse(data) : [];

    if (current) {
      setDataList(current);
    }
  }

  function handleSearchClear() {
    setSearch('');
    searchItems();
  }

  function handleOpenDetails(id: string) {
    const route = user?.isAdmin ? 'product' : 'order';
    navigation.navigate(route, { id });
  }

  function handleRegister() {
    navigation.navigate('product', {});
  }

  useFocusEffect(
    useCallback(() => {
      searchItems();
    }, [])
  );

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <Header>
          <Greeting>
            <GreetingEmoji source={gugu} />
            <GreetingText>Olá, {user.login}</GreetingText>
          </Greeting>
          <TouchableOpacity onPress={signOut}>
            <MaterialIcons name="logout" color={colors.shape} size={24} />
          </TouchableOpacity>
        </Header>

        <Search
          onChangeText={setSearch}
          value={search}
          dataSearched={search}
          onSearch={handleSearch}
          onClear={handleSearchClear}
        />
        <MenuHeader>
          <MenuTitle>Cardápio</MenuTitle>
          <MenuItemsNumber>{dataList.length}</MenuItemsNumber>
        </MenuHeader>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 125,
            marginHorizontal: 24,
            paddingHorizontal: 10,
          }}
        />
        {user?.isAdmin && (
          <NewProductButton onPress={handleRegister} title="Register" type="secundary" />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
