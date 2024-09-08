import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useTheme } from '../../../src/context/Theme';
import { useFavorites } from '../../../src/context/FavoritePokemon';
import ProfileCard from '../../../src/components/pokemon-card';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { favorites } = useFavorites(); // Get the favorite Pokémon list from context

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme ? '#FFF' : '#121212',
      paddingHorizontal: 10,
    },
    emptyMessage: {
      fontSize: 18,
      color: theme ? '#000' : '#FFF',
      textAlign: 'center',
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>You have no favorite Pokémon yet!</Text>
      ) : (
        <FlatList
        style={{width:'100%'}}
          data={favorites} // Use the favorites array from context
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProfileCard
              id={item.id}
              name={item.name}
              type={item.type}
              imageUrl={item.imageUrl}
            />
          )}
        />
      )}
    </View>
  );
}
