import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import TopBar from './src/components/TopBar'
import CityWeatherList from './src/components/CityWeatherList'
import useLocation from './src/hooks/useLocation'

const App: React.FC = () => {

  const { location, error } = useLocation()
  
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      {error && <Text>{error}</Text>}
      {location && <CityWeatherList location={location} />}
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
