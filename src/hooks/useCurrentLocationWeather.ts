import { useState, useEffect } from 'react'
import { CityData, Location } from '../types/genericInterfaces'
import { UseCurrentLocationWeatherResult } from '../types/responseInterfaces'
import { getWeatherByLocation } from '../api/weatherRequests'
import { getLocationName } from '../api/locationRequests'

const useCurrentLocationWeather = (location: Location): UseCurrentLocationWeatherResult => {
    const [currentLocation, setCurrentLocation] = useState<CityData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCurrentLocation = async () => {
            setError(null)
            
            const { cityName, error: cityNameError } = await getLocationName(location.latitude, location.longitude)
            
            const { weather, error: weatherError } = await getWeatherByLocation(location.latitude, location.longitude)
            
            if (cityNameError || weatherError) {
                const errorText = `${cityNameError || ''} ${weatherError || ''}`
                setError(errorText)
                return
            }

            setCurrentLocation({ cityName, location, weather, isYourLocation: true })
        }
        fetchCurrentLocation()
    }, [location])

    return { currentLocation, error }
}

export default useCurrentLocationWeather