import React, { useState, useEffect, useCallback } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native'
import { CityData } from '../types/genericInterfaces'
import { CityWeatherListProps } from '../types/propsInterfaces'
import WeatherCard from './WeatherCard'
import useCurrentLocationWeather from '../hooks/useCurrentLocationWeather'
import useStoredLocationsWeather from '../hooks/useStoredLocationsWeather'
import { getGeoCoordinatesByCityName } from '../api/locationRequests'
import { addLocation } from '../storage/storageActions'
import { showErrorToast } from '../errors/toastService'

const LocationsList: React.FC<CityWeatherListProps> = ({ location }) => {
    const { currentLocation, error: currentLocationError } = useCurrentLocationWeather(location)
    const { storedLocations, error: savedLocationsError, reloadStoredLocations } = useStoredLocationsWeather()
    const [isAddingCity, setIsAddingCity] = useState<boolean>(false)
    const [newCityName, setNewCityName] = useState<string>('')

    const handleAddCity = useCallback(async () => {
        if (!newCityName.trim()) return

        const { data, error } = await getGeoCoordinatesByCityName(newCityName)
        if (error || !data) {
            showErrorToast(error || 'City not found')
            return
        }

        const coordinates = {
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon)
        }

        const capitalizedCityName = newCityName
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        const newCityData: CityData = {
            cityName: capitalizedCityName,
            location: coordinates,
            weather: null,
            isYourLocation: false,
        }

        await addLocation(newCityData)
        reloadStoredLocations()
        setIsAddingCity(false)
        setNewCityName('')
        Keyboard.dismiss()
    }, [newCityName, reloadStoredLocations])

    useEffect(() => {
        const error = currentLocationError || savedLocationsError
        if (error) {
            showErrorToast(error)
        }
    }, [currentLocationError, savedLocationsError])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {currentLocation &&
            <WeatherCard
                cityData={currentLocation}
                reloadStoredLocations={reloadStoredLocations}
                accessible={true}
                accessibilityLabel={`Current location: ${currentLocation.cityName}`}
                accessibilityHint="Displays weather information for your current location"
            />
            }
            {storedLocations.map((location, index) => (
            <WeatherCard
                key={`${location.cityName}-${index}`}
                cityData={location}
                reloadStoredLocations={reloadStoredLocations}
                accessible={true}
                accessibilityLabel={`Stored location: ${location.cityName}`}
                accessibilityHint="Displays weather information for this stored location"
            />
            ))}

            {isAddingCity ? (
            <View style={styles.addCityContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    value={newCityName}
                    onChangeText={setNewCityName}
                    accessibilityLabel="City name input"
                    accessibilityHint="Enter the name of the city to add it to the list"
                />
                <Button
                    title="Add City"
                    onPress={handleAddCity}
                    accessibilityLabel="Add City Button"
                />
            </View>
            ) : (
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsAddingCity(true)}
                accessible={true}
                accessibilityLabel="Add a new city"
                accessibilityHint="Opens input to add a new city to the list"
                accessibilityRole="button"
            >
                <Image source={require('../assets/add-item-icon.png')} />
            </TouchableOpacity>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        flexDirection: 'column',
        width: '100%',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
    },
    addCityContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#rgba(255, 255, 255, 0.55)',
    },
    input: {
        height: 40,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
})

export default LocationsList