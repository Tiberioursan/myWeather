import { GeoCoordinatesResponse, LocationNameResponse, TimeZoneResponse } from '../types/weatherInterfaces'

export const getLocationName = async (latitude: number, longitude: number): Promise<LocationNameResponse> => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

    try {
        const response = await fetch(url)
        const locationData = await response.json()
        return { cityName: locationData.city, error: null }
    } catch (error) {
        return { cityName: '', error: `Error fetching location name` }
    }
}

export const getGeoCoordinatesByCityName = async (cityName: string): Promise<GeoCoordinatesResponse> => {
    const url = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`

    try {
        const response = await fetch(
            url,
            {
                headers: {
                    'User-Agent': 'weatherApp/1.0 (tiberioursan@gmail.com)'
                }
            }
        )
        const locationData = await response.json()
        return { data: locationData[0], error: null }
    } catch (error) {
        return { data: null, error: `City not found: ${error}` }
    }
}

export const getTimeZoneByCoordinates = async (latitude: number, longitude: number): Promise<TimeZoneResponse> => {
    const API_KEY = 'F0XGFMRK0GY6'
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return { offset: data.gmtOffset / 3600, error: null } 
    } catch (error) {
        return { offset: null, error: `Error fetching time zone: ${error}` }
    }
}