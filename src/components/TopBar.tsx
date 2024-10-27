import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const TopBar: React.FC = () => {
  const navigation = useNavigation<any>()
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
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={styles.settingsButton}
      >
        <Image source={require('../assets/settings-icon.png')} />
      </TouchableOpacity>
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
    left: 5,
    zIndex: 1,
  },
  settingsButton: {
    padding: 10,
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
})

export default TopBar