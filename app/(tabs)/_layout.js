import { Tabs } from "expo-router";
import { useTheme } from "../../src/context/Theme";

export default function TabsLayout() {
    const { theme } = useTheme()
    return (
        <Tabs>
            <Tabs.Screen
                name="pokedex/index"
                options={{
                    title: "Pokedex",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: theme == 'light' ? '#E3B505' : '#95190C'
                    },
                    headerTitleStyle: {
                        fontStyle: 'italic'
                    },
                    tabBarStyle:{
                        backgroundColor: 'red'
                    }
                }}
            />
            <Tabs.Screen
                name="favorite/index"
                options={{
                    title: "Favorite",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: theme == 'light' ? '#E3B505' : '#95190C',
                    },
                    headerTitleStyle: {
                        fontStyle: 'italic'
                    }
                }}
            />
            <Tabs.Screen
                name="setting/index"
                options={{
                    title: "Settings",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: theme == 'light' ? '#E3B505' : '#95190C',
                    },
                    headerTitleStyle: {
                        fontStyle: 'italic'
                    }
                }}
            />
        </Tabs>
    )
}