import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTheme } from '../../src/context/Theme';

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const { theme } = useTheme();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: getTypeColor(pokemon?.type[0]),
      },
      headerTintColor: theme ? '#000' : '#FFF',
    });
  }, [pokemon, theme]);

  useEffect(() => {
    fetchPokemonData();
  }, [id]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`http://192.168.1.14:80/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      const data = await response.json();
      setPokemon(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles(theme).container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(theme).container}>
        <Text style={styles(theme).error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles(theme).container}>
      <Text style={styles(theme).title}>{pokemon.name.english}</Text>
      <Image
        style={styles(theme).image}
        source={{ uri: pokemon.image.hires }}
      />
      <View style={styles(theme).infoContainer}>
        <Text style={styles(theme).subTitle}>Types: {pokemon.type.join(', ')}</Text>
        <Text style={styles(theme).subTitle}>Species: {pokemon.species}</Text>
        <Text style={styles(theme).description}>{pokemon.description}</Text>

        <Text style={styles(theme).subTitle}>Base Stats:</Text>
        {Object.entries(pokemon.base).map(([stat, value]) => (
          <Text key={stat} style={styles(theme).info}>{stat}: {value}</Text>
        ))}

        <Text style={styles(theme).subTitle}>Profile:</Text>
        <Text style={styles(theme).info}>Height: {pokemon.profile.height}</Text>
        <Text style={styles(theme).info}>Weight: {pokemon.profile.weight}</Text>
        <Text style={styles(theme).info}>Egg Groups: {pokemon.profile.egg.join(', ')}</Text>
        <Text style={styles(theme).info}>Abilities: {pokemon.profile.ability.map(a => a[0]).join(', ')}</Text>
        <Text style={styles(theme).info}>Gender Ratio: {pokemon.profile.gender}</Text>

        <Text style={styles(theme).subTitle}>Evolution:</Text>
        {pokemon.evolution.prev && (
          <Text style={styles(theme).info}>Evolves from: #{pokemon.evolution.prev[0]} at {pokemon.evolution.prev[1]}</Text>
        )}
        {pokemon.evolution.next && (
          <Text style={styles(theme).info}>Evolves to: #{pokemon.evolution.next[0][0]} at {pokemon.evolution.next[0][1]}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme ? '#FFF' : '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme ? '#000' : '#FFF',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: theme ? '#000' : '#FFF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: theme ? '#000' : '#FFF',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: theme ? '#000' : '#FFF',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});
