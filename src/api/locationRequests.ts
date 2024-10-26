export const getLocationName = async (latitude: number, longitude: number) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`

    try {
        const response = await fetch(url)
        const locationData = await response.json()
        return locationData.city
    } catch (error) {
        console.error('Error fetching city name:', error)
        return ''
    }
}

export const getGeoCoordinatesByCityName = async (cityName: string) => {
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
        return locationData[0]
    } catch (error) {
        console.error('Error fetching coordinates:', error)
        return null
    }
}

export const getTimeZoneByCoordinates = async (latitude: number, longitude: number) => {
    const API_KEY = 'F0XGFMRK0GY6'
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.gmtOffset / 3600
    } catch (error) {
        console.error('Error fetching local time:', error)
        return ''
    }
}