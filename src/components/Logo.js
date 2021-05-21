import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logoTrip.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 220,
    marginBottom: 8,
  },
})
