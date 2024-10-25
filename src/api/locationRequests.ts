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
        console.log('locationData:', locationData[0])
        return locationData[0]
    } catch (error) {
        console.error('Error fetching coordinates:', error)
        return null
    }
}