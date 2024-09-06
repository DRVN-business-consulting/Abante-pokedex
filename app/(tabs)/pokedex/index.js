import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../src/context/Theme';


export default function App() {
  const { theme, setTheme } = useTheme()
  return (
    <View style={[styles.container, (theme == 'light' ? styles.background : styles.backgroundDark)]}>
      <Text style={(theme == 'light' ? styles.text : styles.textDark)}>Current Theme: {theme} !</Text>
      <StatusBar style="auto" />
    </View >
  );
}

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
    backgroundColor: '#121212'
  },
  text: {
    color: '#121212'
  },
  textDark: {
    color: '#FFF'
  }
});
