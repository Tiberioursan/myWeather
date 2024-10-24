import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { CityWeatherListProps, CityData } from '../types/weatherInterfaces'
import { getWeatherByLocation } from '../api/weatherRequests'

const CityWeatherList: React.FC<CityWeatherListProps> = ({ location }) => {
    const [currentLocation, setCurrentLocation] = useState<CityData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const getCurrentPositionWeather = async (latitude: number, longitude: number) => {
        try {
            const data = await getWeatherByLocation(latitude, longitude)
            return data
        } catch (error) {
            setError('Error getting location')
            return null
        }
    }

    useEffect(() => {
        const getCurrentLocation = async () => {
            const weather = await getCurrentPositionWeather(location.latitude, location.longitude)
            setCurrentLocation({ location, weather })
        }

        getCurrentLocation()
    }, [location])

    return (
        <ScrollView horizontal contentContainerStyle={styles.container}>
            {error && <Text>{error}</Text>}
            {currentLocation && <Text>{currentLocation.weather?.temperature}</Text>}
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