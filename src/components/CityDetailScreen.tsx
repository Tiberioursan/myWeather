import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WeatherIcon from './WeatherIcon'
import { getSunEventsByLocation } from '../api/weatherRequests'
import { CityDetailRouteParams } from '../types/navigationTypes'

const DetailScreen = ({ route }: { route: CityDetailRouteParams }) => {
    const { cityData } = route.params
    const [sunriseTime, setSunriseTime] = useState<string>('')
    const [sunsetTime, setSunsetTime] = useState<string>('')

    useEffect(() => {
        const fetchSunEvents = async (): Promise<void> => {
            const location = cityData.location
            const sunEvents = await getSunEventsByLocation(location.latitude, location.longitude)
            setSunriseTime(sunEvents.sunriseTime)
            setSunsetTime(sunEvents.sunsetTime)
        }

        fetchSunEvents()
    }, [cityData.location])

    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>{cityData.cityName}</Text>
            <WeatherIcon iconCode={cityData.weather?.weatherSymbolCode || ''} size={'big'} />
            <Text style={styles.temperature}>{`${cityData.weather?.temperature}°C`}</Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Min Temperature:</Text>
                    <Text style={styles.infoValue}>{`${cityData.weather?.temperatureMin}°C`}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Max Temperature:</Text>
                    <Text style={styles.infoValue}>{`${cityData.weather?.temperatureMax}°C`}</Text>
                </View>
                {sunriseTime && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Sunrise:</Text>
                        <Text style={styles.infoValue}>{sunriseTime}</Text>
                    </View>
                )}
                {sunsetTime && (
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Sunset:</Text>
                        <Text style={styles.infoValue}>{sunsetTime}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    cityName: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 50,
    },
    temperature: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
    },
    infoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        padding: 10,
        margin: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    infoLabel: {
        fontSize: 16,
        color: '#333',
    },
    infoValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
})

export default DetailScreen