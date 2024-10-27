import { WeatherData, CityData, Location } from './genericInterfaces';

export interface GeoCoordinatesResponse {
    data?: {
        lat: string,
        lon: string
    } | null,
    error?: string | null
}

export interface LocationNameResponse {
    cityName: string,
    error: string | null
}

export interface TimeZoneResponse {
    offset: number | null,
    error: string | null
}

export interface WeatherByLocationResponse {
    weather: WeatherData | null,
    error?: string | null
}

export interface SunEventsResponse {
    sunEvents: {
        sunriseTime: string,
        sunsetTime: string
    } | null,
    error?: string | null
}

export interface UseStoredLocationsWeatherResult {
    storedLocations: CityData[],
    error: string | null,
    reloadStoredLocations: () => Promise<void>
}

export interface UseCurrentLocationWeatherResult {
    currentLocation: CityData | null,
    error: string | null
}

export interface UseLocationResult {
    location: Location | null,
    error: string | null
}