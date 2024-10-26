import AsyncStorage from '@react-native-async-storage/async-storage'
import { CityData } from '../types/weatherInterfaces'
import { locationsList } from './locationsStorage'
import { showErrorToast } from '../errors/toastService'

const STORAGE_KEY = '@cities_key'

export const storeAllLocations = async (cities: CityData[]) => {
    try {
        const jsonValue = JSON.stringify(cities)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (error) {
        showErrorToast('Failed to store cities')
    }
}

export const getAllLocations = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        const data = jsonValue ? JSON.parse(jsonValue) : locationsList
        return { data, error: null }
    } catch (error) {
        return { data: locationsList, error: 'Error fetching saved locations' }
    }
}

export const addLocation = async (newCity: CityData) => {
    try {
        const { data: cities, error: getLocationsError } = await getAllLocations()
        if (getLocationsError) {
            showErrorToast('Failed to add city')
            return
        }
        const exists = cities.some((city: CityData) => city.cityName === newCity.cityName);
        if (exists) {
            showErrorToast('City already exists')
            return
        }
        const updatedCities = [...cities, newCity]
        await storeAllLocations(updatedCities)
    } catch (error) {
        showErrorToast('Failed to add city')
    }
}

export const removeLocation = async (cityName: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        const storedCities: CityData[] = jsonValue ? JSON.parse(jsonValue) : []
        const updatedCities = storedCities.filter(city => city.cityName !== cityName)
        await storeAllLocations(updatedCities)
    } catch (error) {
        showErrorToast('Failed to remove city')
    }
}