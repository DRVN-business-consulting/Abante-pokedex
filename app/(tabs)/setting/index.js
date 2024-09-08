import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../../../src/context/Theme';
import { router } from 'expo-router';


export default function SettingTab() {

  const toggleTheme = (isTrue) => {
    if (isTrue)
      setTheme('dark')
    else
      setTheme('light')
  }

  const { theme, setTheme } = useTheme()
  return (
    <View style={[styles.container, (theme ? styles.background : styles.backgroundDark)]}>
      <Text style={(theme ? styles.text : styles.textDark)}>Current Theme: {(theme) ? 'Light Mode' : 'Dark Mode'} !</Text>

      <Switch
        value={theme}
        onValueChange={setTheme}
      />

      <Button title='Log out' onPress={()=>{router.replace('/')}}/>
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
