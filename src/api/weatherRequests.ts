import apiClient from './weatherApiClient'

export const getWeatherByLocation = async (latitude: number, longitude: number) => {
    try {
        const response = await apiClient.get(
            `/locationforecast/2.0/complete?lat=${latitude}&lon=${longitude}`
        )

        const nextSixHours = response.data.properties.timeseries[0].data.next_6_hours
        const temperature = Math.floor(response.data.properties.timeseries[0].data.instant.details.air_temperature)
        const temperatureMin = Math.floor(nextSixHours.details.air_temperature_min)
        const temperatureMax = Math.floor(nextSixHours.details.air_temperature_max)
        const weatherSymbolCode = nextSixHours.summary.symbol_code

        return { temperature, temperatureMin, temperatureMax, weatherSymbolCode }
    } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
    }
}