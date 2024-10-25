import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WeatherCardProps } from '../types/weatherInterfaces'
import WeatherIcon from './WeatherIcon'
import { removeLocation } from '../storage/storageActions'

const WeatherCard: React.FC<WeatherCardProps> = ({ cityData, reloadStoredLocations }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const [isLongPressed, setIsLongPressed] = useState<boolean>(false)

    const handleLongPress = () => {
        setIsLongPressed(true)
    }

    const handleRemoveCity = async () => {
        await removeLocation(cityData.cityName)
        reloadStoredLocations()
    }

    return (
        <TouchableOpacity
            style={[
                styles.card,
                isPressed && styles.cardPressed,
                isLongPressed && styles.cardLongPressed,
                cityData.isYourLocation && styles.yourLocationCard,
            ]}
            onPressIn={() => {setIsPressed(true); setIsLongPressed(false)}}
            onPressOut={() => setIsPressed(false)}
            onLongPress={handleLongPress}
            delayLongPress={400}
        >
            {cityData.isYourLocation && <Text style={styles.yourLocationText}>Your location:</Text>}
            <View style={styles.textContainer}>
                <Text style={[styles.text, isPressed && styles.textPressed, styles.cityName]}>{cityData.cityName}</Text>
                <WeatherIcon iconCode={cityData.weather?.weatherSymbolCode || ''} />
                <Text style={[styles.text, isPressed && styles.textPressed, styles.temperature]}>{cityData.weather?.temperature}°C</Text>
                {isLongPressed && (
                    <TouchableOpacity style={styles.removeButton} onPress={handleRemoveCity}>
                        <Image source={require('../assets/delete-icon.png')} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 30,
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
    },
    yourLocationCard: {
        paddingTop: 5,
    },
    cardPressed: {
        backgroundColor: '#d1d1d1',
    },
    cardLongPressed: {
        width: '85%',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
    },
    textPressed: {
        color: 'black',
        fontWeight: 'bold',
    },
    yourLocationText: {
        fontSize: 10,
        marginBottom: 15,
    },
    cityName: {
        flex: 1,
        textAlign: 'left',
    },
    temperature: {
        flex: 1,
        textAlign: 'right',
    },
    removeButton: {
        padding: 10,
        position: 'absolute',
        right: '-33%',
    },
});

export default WeatherCard;
