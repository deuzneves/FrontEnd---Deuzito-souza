import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function AddExpense({route, navigation }) { //added rout to bring the token information
    const [trip, setTrip] = useState('');
    const [tripID, setTripID] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const {token} = route.params; //bring the token from the login

  async function fetchData3() {

    //this fetch will request data from the method expense
        fetch('http://localhost:8080/' + trip + '/expense', {
            method: 'POST',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true,
            headers: {
                'Conexion': 'keep-alive',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +token, // get the token from the login page
            },
            body: JSON.stringify({ //set the same body as in the API
                tripID: tripID, 
                amount: amount,
                description: description
            }),
        }).then((response) => response.text()) //get the answer in text format
          .then((text)=> {
            if (text == "Bad Request") { //condtion to close the trip if required
              console.log("This trip is closed");
            } else {
                (console.log("Trip added")) //if the trip is not closed, add to it
            }
        }) 
    
             .catch(error => console.log('error', error)); //display the errors message
        
    }

 async function fetchData4(){
    
      fetch('http://localhost:8080/' + trip + '/close',  { //this function is calling the method close
        method: 'POST',
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true
      })
        .then(response => response.text()) //close the Trip
        .then(console.log("Trip is closed"))
        .catch(error => console.log('error', error)); //dkisplay the error message
      
} 
    
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Inform the destination</Header>
      <TextInput
        label="Country"
        keyboardType="text"
        value={trip}
        onChangeText={(trip) => setTrip(trip)} //store the trip name and also the URL
      />
      <Header>Add your expenses</Header>
      <TextInput
        label="Trip name"
        returnKeyType="next"
        keyboardType="text"
        value={tripID}
        onChangeText={(tripID) =>setTripID(tripID)} //store the tripID in the data

      />
      <TextInput
        label="Amount"
        keyboardType="text"
        value={amount}
        onChangeText={(amount) => setAmount(amount)} //store the Amount typed in the data
      />
       <TextInput
        label="Description"
        returnKeyType="done"
        keyboardType="text"
        value={description}
        onChangeText={(description) => setDescription(description)} //store the description in the data
      />
      <Button
        mode="contained"
        onPress={fetchData3} //call the fetch function to add an expense
        style={{ marginTop: 24 }}
      >
        Add Expense
      </Button>
      <Button
        mode="contained"
        onPress={fetchData4} //call the fetch function to close a trip
        style={{ marginTop: 24 }}
      >
        Close trip
      </Button>
      <View style={styles.row}>
        <Text>Click here to see the  </Text>
        <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
          <Text style={styles.link}>EXPENSES</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}
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
