import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WeatherCardProps } from '../types/weatherInterfaces'

const WeatherCard: React.FC<WeatherCardProps> = ({ cityData }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)

    return (
        <TouchableOpacity
            style={[styles.card, isPressed && styles.cardPressed, cityData.isYourLocation && styles.yourLocationCard]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {cityData.isYourLocation && <Text style={styles.yourLocationText}>Your location:</Text>}
            <View style={styles.textContainer}>
                <Text style={[styles.text, isPressed && styles.textPressed, styles.cityName]}>{cityData.cityName}</Text>
                <Text style={[styles.text, isPressed && styles.textPressed, styles.temperature]}>{cityData.weather?.temperature}°C</Text>
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
});

export default WeatherCard;
