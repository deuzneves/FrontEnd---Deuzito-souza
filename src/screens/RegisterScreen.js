import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  //create constants for username and password
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  function registerNewUser() {
    //call the API user method
    fetch('http://localhost:8080/users?username='+username+'&password='+password, {
      method: 'POST',
      cache: 'no-cache',
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true,
      headers: {
        'Accept': 'application/json', //accept json as a response
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username, //store username and password on the body
        password: password,
      }),
    }) .then((response) => {response.text() //response in text format
    }) 
      .catch(error => console.log('Bad Request')) //in case of an error, display Bad Request

      if(passwordValidator(password)){ //validates de password so it contains all the requirements
      alert("Password must be at least 8 characters long and contain at least one symbol")
      }else if (nameValidator(username)) { // display a message in case the usernament is empty
        alert("Username cannot be empty") 
      
      } else {
        console.log("User registered") 
        navigation.push("StartScreen") //If username and password are valids, go to the next page
      } 
    }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username}
        onChangeText={(username) =>setUsername(username)} //store the username typed

      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(password) => setPassword(password)} //store the password typed
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={registerNewUser} //call the fetch function
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
    </Background>
  )

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
}