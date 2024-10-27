import { Location, CityData } from './genericInterfaces';

export interface CityWeatherListProps {
    location: Location
}

export interface WeatherCardProps {
    cityData: CityData,
    reloadStoredLocations: () => Promise<void>
    accessible: boolean | false,
    accessibilityLabel: string | '',
    accessibilityHint: string | ''
}

export interface WeatherIconProps {
    iconCode: string,
    size: 'small' | 'big',
    accessible: boolean | false,
    accessibilityLabel: string | ''
}

export interface TimeDisplayProps {
    latitude: number
    longitude: number
}

export interface BackgroundWrapperProps {
    children: React.ReactNode
}