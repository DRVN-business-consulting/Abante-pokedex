import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../src/context/Theme';
import { useState } from 'react';
import { router } from 'expo-router';

export default function App() {
  const { theme, setTheme } = useTheme()

  const [token, setToken] = useState()

  const password = "pass"

  const validate = () =>{
    if(password === token) router.replace('/(tabs)/pokedex')
    else Alert.alert('Log in Failed.')
  }


  return (
    <View style={[styles.container, (theme == 'light' ? styles.background : styles.backgroundDark)]}>
      <Text
        style={[(theme == 'light' ? styles.text : styles.textDark), { fontSize: 30, fontWeight: 'bold', fontStyle: 'italic' }]}
      >
        Login
      </Text>

      <TextInput
        style={(theme == 'light' ? styles.textInput : styles.textInputDark)}
        value={token}
        onChangeText={setToken}
        placeholder='token'
        placeholderTextColor={(theme == 'light') ? '#121212' : '#FFF'}
        secureTextEntry
      />

      <TouchableOpacity
        style={(theme == 'light' ? styles.button : styles.buttonDark)}
        onPress={validate}
      >
        <Text
          style={(theme == 'light' ? styles.text : styles.textDark)} >
          Log in
        </Text>
      </TouchableOpacity>

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
  },
  textInput: {
    margin: 10,
    padding: 5,
    borderColor: '#121212',
    borderWidth: 1,
    borderRadius: 4,
    width: '40%',
    height: '4%',
    color: '#121212',
  },
  textInputDark: {
    margin: 10,
    padding: 5,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    width: '40%',
    height: '4%',
    color: '#FFF',
  },
  button: {
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 3,
    padding: 4
  },
  buttonDark: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 3,
    padding: 4
  }
});
