import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import TopBar from './src/components/TopBar'
import CityWeatherList from './src/components/CityWeatherList'

const App: React.FC = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <CityWeatherList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default App;
