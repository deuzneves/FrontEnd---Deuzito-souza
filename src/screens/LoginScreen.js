import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function LoginScreen({ navigation }) {
  // get username and password from the server
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function fetchData() { 
    // condition to clear the password
    if (username && password) {
    fetch('http://localhost:8080/login?username='+username+'&password='+password, {  
    redirect: 'follow',
    "Access-Control-Allow-Origin" : "*", //get access from api
    "Access-Control-Allow-Credentials" : true
  })
    .then((response) => response.text()) //get the answer in text
    .then((text) => {
     if (text == "Unauthorized") { // display an alert in case user or password is invalid
       alert("User or password is invalid. Please try again");
       
     } else { // if the user and password is valid, call function to clean the password and navigate to the next page
       clearPassword();
       navigation.push("AddExpense", {
         username: username, // when navigate to the next page, store the username and token
         token: text,
       });
     }
    })
  }
  }
   function clearPassword() {
     setPassword('');
   }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        onChangeText={setUsername} //store the typed username
        autoCapitalize="none"
        autoCompleteType="text"
        textContentType="text"
        keyboardType="text"
        value={username}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        onChangeText={setPassword} //store the typed password
        secureTextEntry //make the password secure
        value={password}
      /> 
      <Button mode="contained" onPress={fetchData}> 
        Login 
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
