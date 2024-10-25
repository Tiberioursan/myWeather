import AsyncStorage from '@react-native-async-storage/async-storage'
import { CityData } from '../types/weatherInterfaces'
import { locationsList } from './locationsStorage'

const STORAGE_KEY = '@cities_key'

export const storeAllLocations = async (cities: CityData[]) => {
    try {
        const jsonValue = JSON.stringify(cities)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (error) {
        console.error('Error saving cities:', error)
    }
}

export const getAllLocations = async (): Promise<CityData[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : locationsList
    } catch (error) {
        console.error('Error retrieving cities:', error)
        return locationsList
    }
}

export const addLocation = async (newCity: CityData) => {
    const cities = await getAllLocations()
    const updatedCities = [...cities, newCity]
    await storeAllLocations(updatedCities)
}

export const removeLocation = async (cityName: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        const storedCities: CityData[] = jsonValue ? JSON.parse(jsonValue) : []
        const updatedCities = storedCities.filter(city => city.cityName !== cityName)
        await storeAllLocations(updatedCities)
    } catch (error) {
        console.error('Error removing city:', error)
    }
};