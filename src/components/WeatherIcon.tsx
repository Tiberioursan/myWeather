import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Image from 'react-native-remote-svg'
import { WeatherIconProps } from '../types/weatherInterfaces'

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size }) => {
    const [weatherIcon, setWeatherIcon] = useState<string | null>(null)

    useEffect(() => {
        if (iconCode) {
            const iconUrl = `https://api.met.no/images/weathericons/svg/${iconCode}.svg`
            setWeatherIcon(iconUrl)
        }
    }, [iconCode])

    return (
        <Image
            source={{ uri: weatherIcon || '' }}
            style={styles[`${size}WeatherIcon`]}
        />
    )
}

const styles = StyleSheet.create({
    smallWeatherIcon: {
        width: 80,
        height: 70,
        alignSelf: 'center',
    },
    bigWeatherIcon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    }
})

export default WeatherIcon