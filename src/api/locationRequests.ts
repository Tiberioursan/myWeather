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