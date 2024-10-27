import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const TopBar: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styles.container}>
      {route.name !== 'Home' && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={require('../assets/back-icon.png')} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>myWeather</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7549F2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
})

export default TopBar