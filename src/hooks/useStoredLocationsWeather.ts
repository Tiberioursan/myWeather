import { useState, useEffect } from 'react'
import { CityData } from '../types/weatherInterfaces'
import { getAllLocations } from '../storage/storageActions'
import { getWeatherByLocation } from '../api/weatherRequests'

const useStoredLocationsWeather = () => {
    const [storedLocations, setStoredLocations] = useState<CityData[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchStoredLocationsWeather = async () => {
        try {
            const savedLocations = await getAllLocations()
            console.log('savedLocations:', savedLocations)
            const locationsWithWeather = await Promise.all(
                savedLocations.map(async (city) => {
                    const weather = await getWeatherByLocation(city.location.latitude, city.location.longitude)
                    return { ...city, weather }
                })
            )
            setStoredLocations(locationsWithWeather)
        } catch (err) {
            setError('Error fetching saved locations weather')
        }
    }

    const reloadStoredLocations = () => {
        fetchStoredLocationsWeather()
    }

    useEffect(() => {
        fetchStoredLocationsWeather()
    }, [])

    return { storedLocations, error, reloadStoredLocations }
}

export default useStoredLocationsWeather