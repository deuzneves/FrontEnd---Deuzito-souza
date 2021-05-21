import React, { useState} from 'react'
import {View, FlatList, StyleSheet} from 'react-native';
import Background from '../components/Background'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function Dashboard({navigation }) {

  //Create the constants to pull data from the API
  const [trip, setTrip] = useState('');
  const [data, setData] = useState([]);

  async function fetchData2() { 

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
  }
    // Fetch data from the API and method GET {Trip}
    fetch("http://localhost:8080/" +trip, requestOptions)
    .then((response) => response.json())
    // Get the Items added and store in the constante data
    .then((json) => setData(json))
    // Show the possible errors
    .catch((error) => console.error(error))
  }
  return (

<Background>
<BackButton goBack={navigation.goBack} />
      <Header>EXPENSES</Header>
      <Paragraph>
      </Paragraph>
      
      <Header> Inform the country</Header>
       <TextInput
        label="Country"
        keyboardType="text"
        value={trip}
        onChangeText={(trip) => setTrip(trip)} // that will define the name of the trip and the URL
      />
      <Button
        mode="contained"
        onPress={fetchData2} // call the fetch function when press the button
        style={{ marginTop: 24 }}
      >
        Show Expenses
      </Button>
  
          <FlatList 
            data={data} //get the Data stored from the json
            keyExtractor={({item}, index) => item} // choose a key to call it
            renderItem={({ item }) =>  ( //get the data stored
          <View  styles={styles.row}>
          <Header>Trip ID: <Paragraph styles={styles.row}> {item.tripID}</Paragraph > </Header> 
          <Header>Amount: <Paragraph  styles={styles.row}>€{item.amount}</Paragraph ></Header>
          <Header>Description: <Paragraph styles={styles.row}> {item.description}</Paragraph ></Header>
          <Header>User: <Paragraph  styles={styles.row}> {item.user}</Paragraph ></Header>
          <Header>__________________</Header>
        </View>
            )}
          />
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
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
  flatlist: {
    justifyContent: 'center',
     flexDirection: 'row',
      flexWrap: 'wrap'
  }
})