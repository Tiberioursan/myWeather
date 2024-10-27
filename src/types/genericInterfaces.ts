export interface Location {
    latitude: number,
    longitude: number
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

export interface TemperatureContextType {
    temperatureUnit: string,
    setTemperatureUnit: (unit: string) => void
}

export interface PopupContent {
    message: string,
    confirmText: string,
    cancelText: string,
    onConfirm: (() => void) | null,
    onCancel: () => void
}

export interface PopupContextType {
    isVisible: boolean,
    popupContent: PopupContent,
    showPopup: (content: PopupContent) => void,
    hidePopup: () => void
}