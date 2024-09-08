import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../src/context/Theme';
import { useEffect, useState } from 'react';
import ProfileCard from '../../../src/components/pokemon-card';

export default function PokedexScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      backgroundColor: '#FFF',
    },
    backgroundDark: {
      backgroundColor: '#121212',
    },
    searchBar: {
      height: 40,
      borderColor: '#007BFF',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      margin: 5,
      color: theme ? '#121212' : '#FFF',
      backgroundColor: theme ? '#FFF' : '#333',
    },
    typeButton: {
      padding: 5,
      marginHorizontal: 5,
      borderRadius: 5,
    },
    typeButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
    typeContainer: {
      flexDirection: 'row',
      marginVertical: 20,
    },
  });

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.14:80/pokemon');
      let json = await response.json();

      const uniqueData = json.filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
      );

      setData(uniqueData);
      setFilteredData(uniqueData);
      extractTypes(uniqueData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const extractTypes = (pokemonData) => {
    const allTypes = pokemonData.flatMap(pokemon => pokemon.type);
    const uniqueTypes = [...new Set(allTypes)];
    setTypes(uniqueTypes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedType, data]);

  const filterData = () => {
    let filtered = data;

    if (searchQuery !== '') {
      filtered = filtered.filter(item =>
        item.name.english.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== '') {
      filtered = filtered.filter(item => item.type.includes(selectedType));
    }

    setFilteredData(filtered);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Normal':
        return theme ? '#1D1C21' : '#FAFAC6';
      case 'Grass':
        return 'green';
      case 'Fire':
        return 'orange';
      case 'Water':
        return '#00B0E0';
      case 'Electric':
        return '#D6FF0A';
      case 'Ice':
        return '#BFDBF7';
      case 'Fighting':
        return 'red';
      case 'Poison':
        return 'purple';
      case 'Ground':
        return '#F2F269';
      case 'Flying':
        return 'violet';
      case 'Psychic':
        return '#CF8BA9';
      case 'Bug':
        return '#9EB25D';
      case 'Rock':
        return 'gold';
      case 'Ghost':
        return '#CEC2FF';
      case 'Dragon':
        return '#B3B3F1';
      case 'Dark':
        return 'brown';
      case 'Steel':
        return 'silver';
      case 'Fairy':
        return '#FECDAA';
      default:
        return '#007BFF';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={[styles.container, theme ? styles.background : styles.backgroundDark]}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        placeholderTextColor={theme ? '#333' : '#FFF'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeContainer}>
        <TouchableOpacity onPress={() => setSelectedType('')}>
          <View style={[styles.typeButton, { backgroundColor: getTypeColor('All') }]}>
            <Text style={styles.typeButtonText}>All</Text>
          </View>
        </TouchableOpacity>
        {types.map((type, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedType(type)}>
            <View style={[styles.typeButton, { backgroundColor: getTypeColor(type) }]}>
              <Text style={styles.typeButtonText}>{type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        style={{ width: '100%' }}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProfileCard
            id={item.id}
            imageUrl={item.image.hires}
            name={item.name.english}
            type={item.type}
          />
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
