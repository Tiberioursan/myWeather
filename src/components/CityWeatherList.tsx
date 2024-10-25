import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { CityWeatherListProps } from '../types/weatherInterfaces'
import WeatherCard from './WeatherCard'
import useCurrentLocationWeather from '../hooks/useCurrentLocationWeather'
import useSavedLocationsWeather from '../hooks/useStoredLocationsWeather'

const CityWeatherList: React.FC<CityWeatherListProps> = ({ location }) => {
    const { currentLocation, error: currentLocationError } = useCurrentLocationWeather(location)
    const { savedLocationsWeather, error: savedLocationsError } = useSavedLocationsWeather()

    const error = currentLocationError || savedLocationsError

    return (
        <ScrollView horizontal contentContainerStyle={styles.container}>
            {error && <Text>{error}</Text>}
            {currentLocation && <WeatherCard cityData={currentLocation} />}
            {savedLocationsWeather.map((location, index) => (
                <WeatherCard key={`${location.cityName}-${index}`} cityData={location} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
})

export default CityWeatherList