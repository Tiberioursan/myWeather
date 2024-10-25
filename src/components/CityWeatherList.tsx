import React, { useState } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native'
import { CityWeatherListProps, CityData } from '../types/weatherInterfaces'
import WeatherCard from './WeatherCard'
import useCurrentLocationWeather from '../hooks/useCurrentLocationWeather'
import useStoredLocationsWeather from '../hooks/useStoredLocationsWeather'
import { getGeoCoordinatesByCityName } from '../api/locationRequests'
import { addLocation } from '../storage/storageActions'

const CityWeatherList: React.FC<CityWeatherListProps> = ({ location }) => {
    const { currentLocation, error: currentLocationError } = useCurrentLocationWeather(location)
    const {
        storedLocations,
        error: savedLocationsError,
        reloadStoredLocations
    } = useStoredLocationsWeather() as {
        storedLocations: CityData[],
        error: string | null,
        reloadStoredLocations: () => Promise<void>
    }
    const [isAddingCity, setIsAddingCity] = useState<boolean>(false)
    const [newCityName, setNewCityName] = useState<string>('')
    const [addCityError, setAddCityError] = useState<string | null>(null)

    const error = currentLocationError || savedLocationsError

    const handleAddCity = async () => {
        if (!newCityName.trim()) return

        try {
            const response = await getGeoCoordinatesByCityName(newCityName)
            if (!response) {
                setAddCityError('City not found')
                return
            }

            const coordinates = { latitude: parseFloat(response.lat), longitude: parseFloat(response.lon) }
            console.log('coordinates:', coordinates)

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
            setAddCityError(null)
        } catch (error) {
            setAddCityError('Failed to add city')
        }
    }

    return (
        <ScrollView horizontal contentContainerStyle={styles.container}>
            {error && <Text>{error}</Text>}
            {currentLocation &&
                <WeatherCard
                    cityData={currentLocation}
                    reloadStoredLocations={reloadStoredLocations}
                />
            }
            {storedLocations.map((location, index) => (
                <WeatherCard
                    key={`${location.cityName}-${index}`}
                    cityData={location}
                    reloadStoredLocations={reloadStoredLocations}
                />
            ))}

            {isAddingCity ? (
                <View style={styles.addCityContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter city name"
                        value={newCityName}
                        onChangeText={setNewCityName}
                    />
                    <Button title="Add City" onPress={handleAddCity} />
                </View>
            ) : (
                <TouchableOpacity style={styles.addButton} onPress={() => setIsAddingCity(true)}>
                    <Text style={styles.addButtonText}>+ Add City</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ccc',
    },
    addButtonText: {
        fontSize: 16,
        color: '#000',
    },
    addCityContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width: 150,
        marginBottom: 10,
    },
})

export default CityWeatherList