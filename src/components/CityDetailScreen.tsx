import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WeatherIcon from './WeatherIcon'
import CityDateAndTime from './CityDateAndTime'
import { getSunEventsByLocation } from '../api/weatherRequests'
import { CityDetailRouteParams } from '../types/navigationTypes'
import { showErrorToast } from '../errors/toastService'
import useTemperature from '../hooks/useTemperature'

const DetailScreen = ({ route }: { route: CityDetailRouteParams }) => {
    const { cityData } = route.params
    const [sunriseTime, setSunriseTime] = useState<string>('')
    const [sunsetTime, setSunsetTime] = useState<string>('')

    useEffect(() => {
        const fetchSunEvents = async (): Promise<void> => {
            const location = cityData.location
            const sunEvents = await getSunEventsByLocation(
                location.latitude,
                location.longitude
            )

            if (sunEvents.error) {
                showErrorToast(sunEvents.error)
                return
            }
            setSunriseTime(sunEvents.sunriseTime)
            setSunsetTime(sunEvents.sunsetTime)
        }

        fetchSunEvents()
    }, [cityData.location])

    return (
        <View style={styles.container}>
            <View
                style={styles.mainInfoBox}
                accessible={true}
                accessibilityLabel={`Weather details for ${cityData.cityName}`}
            >
                <CityDateAndTime latitude={cityData.location.latitude} longitude={cityData.location.longitude} />
                <Text
                    style={styles.cityName}
                    accessible={true}
                    accessibilityRole="header"
                >{cityData.cityName}</Text>
                <WeatherIcon
                    iconCode={cityData.weather?.weatherSymbolCode || ''}
                    size={'big'}
                    accessible={true}
                    accessibilityLabel={`Weather icon for ${cityData.cityName}`}
                />
                <Text
                    style={styles.temperature}
                    accessibilityLabel={`Temperature for ${cityData.cityName}`}
                >{useTemperature(cityData.weather?.temperature ?? 0)}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View
                    style={styles.infoBox}
                    accessible={true}
                    accessibilityLabel={`Min temperature: ${useTemperature(cityData.weather?.temperatureMin ?? 0)}`}
                >
                    <Text style={styles.infoLabel}>Min Temperature:</Text>
                    <Text style={styles.infoValue}>{useTemperature(cityData.weather?.temperatureMin ?? 0)}</Text>
                </View>
                <View
                    style={styles.infoBox}
                    accessible={true}
                    accessibilityLabel={`Max temperature: ${useTemperature(cityData.weather?.temperatureMax ?? 0)}`}
                >
                    <Text style={styles.infoLabel}>Max Temperature:</Text>
                    <Text style={styles.infoValue}>{useTemperature(cityData.weather?.temperatureMax ?? 0)}</Text>
                </View>
                {sunriseTime && (
                    <View
                        style={styles.infoBox}
                        accessible={true}
                        accessibilityLabel={`Sunrise time: ${sunriseTime}`}
                    >
                        <Text style={styles.infoLabel}>Sunrise:</Text>
                        <Text style={styles.infoValue}>{sunriseTime}</Text>
                    </View>
                )}
                {sunsetTime && (
                    <View
                        style={styles.infoBox}
                        accessible={true}
                        accessibilityLabel={`Sunset time: ${sunsetTime}`}
                    >
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
        padding: 20,
    },
    cityName: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 30,
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
    mainInfoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 20,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        marginTop: '15%',
    },
    infoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
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