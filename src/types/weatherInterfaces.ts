export interface Location {
    latitude: number,
    longitude: number
}

export interface CityWeatherListProps {
    location: Location
}

export interface WeatherData {
    temperature: number | 0,
    temperatureMin: number | 0,
    temperatureMax: number | 0,
    weatherSymbolCode: string | ''
}

export interface CityData {
    cityName: string,
    location: Location,
    weather: WeatherData | null,
    isYourLocation: boolean
}

export interface WeatherCardProps {
    cityData: CityData
}

