import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import toastConfig from './src/errors/toastConfig'
import { showErrorToast } from './src/errors/toastService'
import TopBar from './src/components/TopBar'
import CityWeatherList from './src/components/CityWeatherList'
import CityDetailScreen from './src/components/CityDetailScreen'
import BackgroundWrapper from './src/components/BackgroundWrapper'
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
    <BackgroundWrapper>
      <TopBar />
      {location && <CityWeatherList location={location} />}
    </BackgroundWrapper>
  )
}

const DetailScreen: React.FC<CityDetailScreenProps> = ({ route }) => {
  return (
    <BackgroundWrapper>
      <TopBar />
      <CityDetailScreen route={route} />
    </BackgroundWrapper>
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

export default App
