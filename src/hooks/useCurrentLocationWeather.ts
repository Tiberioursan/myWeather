import { useState, useEffect } from 'react'
import { CityData, Location } from '../types/weatherInterfaces'
import { getWeatherByLocation } from '../api/weatherRequests'
import { getLocationName } from '../api/locationRequests'

const useCurrentLocationWeather = (location: Location) => {
    const [currentLocation, setCurrentLocation] = useState<CityData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCurrentLocation = async () => {
            try {
                const cityName = await getLocationName(location.latitude, location.longitude)
                const weather = await getWeatherByLocation(location.latitude, location.longitude)
                setCurrentLocation({ cityName, location, weather, isYourLocation: true })
            } catch (err) {
                setError('Error fetching current location weather')
            }
        }
        fetchCurrentLocation()
    }, [location])

    return { currentLocation, error }
}

export default useCurrentLocationWeather