import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/Theme";


export default function AppLayout() {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown:false
                    }}
                />
            </Stack>
        </ThemeProvider>
    )
}