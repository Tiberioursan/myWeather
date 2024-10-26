import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Toast from 'react-native-toast-message'
import toastConfig from './src/errors/toastConfig'
import { showErrorToast } from './src/errors/toastService'
import TopBar from './src/components/TopBar'
import CityWeatherList from './src/components/CityWeatherList'
import CityDetailScreen from './src/components/CityDetailScreen'
import useLocation from './src/hooks/useLocation'
import { RootStackParamList, CityDetailScreenProps } from './src/types/navigationTypes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeScreen: React.FC = () => {
  const { location, error } = useLocation()

  useEffect(() => {
    if (error) {
      showErrorToast(error)
    }
  }, [error])

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      {location && <CityWeatherList location={location} />}
    </SafeAreaView>
  )
}

const DetailScreen: React.FC<CityDetailScreenProps> = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <CityDetailScreen route={route} />
    </SafeAreaView>
  )
}

const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CityDetail" component={DetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const App: React.FC = () => (
  <>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    <Toast config={toastConfig} />
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default App
