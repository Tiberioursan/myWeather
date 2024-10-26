import { useState, useEffect } from 'react'
import { CityData } from '../types/weatherInterfaces'
import { getAllLocations } from '../storage/storageActions'
import { getWeatherByLocation } from '../api/weatherRequests'

const useStoredLocationsWeather = () => {
    const [storedLocations, setStoredLocations] = useState<CityData[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchStoredLocationsWeather = async () => {
        setError(null)
        
        const { data: savedLocations, error: locationsError } = await getAllLocations()

        if (locationsError) {
            setError(locationsError)
            console.error('Error fetching saved locationssssssssssssssss:', locationsError)
            return
        }

        const locationsWithWeather = await Promise.all(
            savedLocations.map(async (city: CityData) => {
                const { weather, error: weatherError } = await getWeatherByLocation(city.location.latitude, city.location.longitude)
                if (weatherError) {
                    setError(weatherError)
                    console.error('Error fetching weather:', weatherError)
                    return city
                }
                return { ...city, weather }
            })
        )

        setStoredLocations(locationsWithWeather)
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