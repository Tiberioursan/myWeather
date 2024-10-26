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
    cityData: CityData,
    reloadStoredLocations: () => Promise<void>
}

export interface WeatherIconProps {
    iconCode: string,
    size: 'small' | 'big'
}

export interface TimeDisplayProps {
    latitude: number
    longitude: number
}

export interface GeoCoordinatesResponse {
    data?: {
        lat: string;
        lon: string;
    } | null;
    error?: string | null;
}

export interface WeatherByLocationResponse {
    weather: WeatherData | null,
    error?: string | null
}

export interface LocationNameResponse {
    cityName: string;
    error: string | null;
}

export interface TimeZoneResponse {
    offset: number | null;
    error: string | null;
}