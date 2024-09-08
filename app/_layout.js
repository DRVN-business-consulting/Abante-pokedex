import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/Theme";
import { FavoritesProvider } from "../src/context/FavoritePokemon";


export default function AppLayout() {
    return (

        <ThemeProvider>
            <FavoritesProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="pokemon/[id]"
                        options={{
                            title: 'Pokemon Profile',
                            headerShown: true
                        }}
                    />
                </Stack>
            </FavoritesProvider>
        </ThemeProvider>
    )
}