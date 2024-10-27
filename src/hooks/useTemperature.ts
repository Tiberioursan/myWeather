import { useEffect, useState } from 'react'
import { useTemperatureContext } from '../context/SettingsContext'

const useTemperature = (temperatureInCelsius: number) => {
    const { temperatureUnit } = useTemperatureContext()
    const [formattedTemperature, setFormattedTemperature] = useState<string>('')

    useEffect(() => {
        if (typeof temperatureInCelsius !== 'number' || isNaN(temperatureInCelsius)) {
            setFormattedTemperature('N/A')
            return
        }

        if (temperatureUnit === 'Celsius') {
            setFormattedTemperature(`${Math.round(temperatureInCelsius)} °C`)
        } else {
            const fahrenheit = (temperatureInCelsius * 9) / 5 + 32
            setFormattedTemperature(`${Math.round(fahrenheit)} °F`)
        }
    }, [temperatureInCelsius, temperatureUnit])

    return formattedTemperature
}

export default useTemperature