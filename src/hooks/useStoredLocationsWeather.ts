import { useState, useEffect } from 'react'
import { CityData } from '../types/weatherInterfaces'
import { getAllLocations } from '../storage/storageActions'
import { getWeatherByLocation } from '../api/weatherRequests'

const useSavedLocationsWeather = () => {
    const [savedLocationsWeather, setSavedLocationsWeather] = useState<CityData[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSavedLocationsWeather = async () => {
            try {
                const savedLocations = await getAllLocations()
                const locationsWithWeather = await Promise.all(
                    savedLocations.map(async (city) => {
                        const weather = await getWeatherByLocation(city.location.latitude, city.location.longitude)
                        return { ...city, weather }
                    })
                )
                setSavedLocationsWeather(locationsWithWeather)
            } catch (err) {
                setError('Error fetching saved locations weather')
            }
        }
        fetchSavedLocationsWeather()
    }, [])

    return { savedLocationsWeather, error }
}

export default useSavedLocationsWeather