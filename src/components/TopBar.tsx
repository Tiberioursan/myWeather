import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigationInterfaces'

const TopBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList, keyof RootStackParamList>>()

  return (
    <View style={styles.container}>
      {route.name !== 'Home' && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessible={true}
          accessibilityLabel="Back button"
          accessibilityHint="Returns to the previous screen"
          accessibilityRole="button"
        >
          <Image source={require('../assets/back-icon.png')} accessibilityLabel="Back icon" />
        </TouchableOpacity>
      )}
      <Text
        style={styles.title}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="My Weather App"
      >myWeather</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={styles.settingsButton}
        accessible={true}
        accessibilityLabel="Settings"
        accessibilityHint="Opens the settings page"
        accessibilityRole="button"
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