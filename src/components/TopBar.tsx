import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TopBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>myWeather</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default TopBar