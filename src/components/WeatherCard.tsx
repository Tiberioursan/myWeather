import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WeatherCardProps } from '../types/weatherInterfaces'
import { RootStackParamList } from '../types/navigationTypes'
import WeatherIcon from './WeatherIcon'
import { removeLocation } from '../storage/storageActions'
import useTemperature from '../hooks/useTemperature'

const WeatherCard: React.FC<WeatherCardProps> = ({ cityData, reloadStoredLocations }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const [isLongPressed, setIsLongPressed] = useState<boolean>(false)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handleLongPress = () => {
        setIsLongPressed(true)
    }

    const handleRemoveCity = useCallback(async () => {
        await removeLocation(cityData.cityName)
        reloadStoredLocations()
    }, [cityData.cityName, reloadStoredLocations])

    const handlePress = useCallback(() => {
        if (isLongPressed) {
            console.log('long press')
            setIsLongPressed(false)
            return
        }
        navigation.navigate('CityDetail', { cityData })
    }, [cityData, navigation])
    
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isPressed && styles.cardPressed,
                cityData.isYourLocation && styles.yourLocationCard,
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onLongPress={handleLongPress}
            delayLongPress={400}
            onPress={handlePress}
        >
            {cityData.isYourLocation && <Text style={styles.yourLocationText}>Your location</Text>}
            <View style={[
                styles.textContainer, 
                isLongPressed && styles.cardLongPressed,
                ]}
            >
                <Text style={[styles.text, isPressed && styles.textPressed, styles.cityName]}>{cityData.cityName}</Text>
                <WeatherIcon iconCode={cityData.weather?.weatherSymbolCode || ''} size='small' />
                <Text
                    style={[styles.text, isPressed && styles.textPressed, styles.temperature]}
                >
                    {useTemperature(cityData.weather?.temperature ?? 0)}
                </Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
    },
    yourLocationCard: {
        paddingTop: 5,
    },
    cardPressed: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    cardLongPressed: {
        width: '80%',
        marginLeft: '-20%',
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
        color: 'white',
        fontWeight: 'bold',
    },
    yourLocationText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0C5881',
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
        right: '-30%',
    },
})

export default WeatherCard
