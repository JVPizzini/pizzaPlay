import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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
} from './styles';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  priceG: string;
  priceM: string;
  priceP: string;
}

//assets
import gugu from '@assets/gugu.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PIZZAS_COLLECTION } from '@screens/Product';

export function Home() {
  const { colors } = useTheme();
  const [dataList, setDataList] = useState<ProductCardProps[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  async function searchItems() {
    const data = await AsyncStorage.getItem(PIZZAS_COLLECTION);
    const currentData = data ? JSON.parse(data) : [];

    if (currentData) {
      setDataList(currentData);
    } else {
      Alert.alert('Não há produtos');
    }
  }

  function handleSearch() {
    const dataFiltered = dataList.filter(
      (item) =>
        item.name.toUpperCase().includes(search.toUpperCase()) ||
        item.description.toUpperCase().includes(search.toUpperCase())
    );
    setDataList(dataFiltered);
  }

  function handleSearchClear() {
    setSearch('');
    searchItems();
  }

  function handleOpenDetails(id: string) {
    navigation.navigate('product', { id });
  }

  function teste() {
    navigation.navigate('product',{});
  }

  useEffect(() => {
    searchItems();
  }, [dataList]);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={gugu} />
          <GreetingText>ola, admin</GreetingText>
        </Greeting>
        <TouchableOpacity onPress={teste}>
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
    </Container>
  );
}
