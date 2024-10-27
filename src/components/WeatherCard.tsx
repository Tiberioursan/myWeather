import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WeatherCardProps } from '../types/propsInterfaces'
import { RootStackParamList } from '../types/navigationInterfaces'
import WeatherIcon from './WeatherIcon'
import { removeLocation } from '../storage/storageActions'
import useTemperature from '../hooks/useTemperature'
import { usePopup } from '../context/PopupContext'

const WeatherCard: React.FC<WeatherCardProps> = ({ cityData, reloadStoredLocations }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)
    const [isLongPressed, setIsLongPressed] = useState<boolean>(false)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const { showPopup } = usePopup()

    const handleLongPress = () => {
        setIsLongPressed(true)
    }

    const handleRemoveCity = useCallback(async () => {
        showPopup({
            message: `Are you sure you want to remove ${cityData.cityName}?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
                await removeLocation(cityData.cityName)
                reloadStoredLocations()
            },
            onCancel: () => {setIsLongPressed(false)}
        })
    }, [cityData.cityName, reloadStoredLocations])

    const handlePress = () => {
        if (isLongPressed) {
            console.log('long presssss')
            setIsLongPressed(false)
            return
        }
        navigation.navigate('CityDetail', { cityData })
    }
    
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isPressed && styles.cardPressed,
                isLongPressed && styles.cardLongPressed,
                cityData.isYourLocation && styles.yourLocationCard,
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onLongPress={handleLongPress}
            delayLongPress={400}
            onPress={handlePress}
            accessible={true}
            accessibilityLabel={`${cityData.cityName} weather card`}
            accessibilityHint="Press to view details, long-press to remove"
            accessibilityRole="button"
        >
            {cityData.isYourLocation &&
                <Text
                    style={styles.yourLocationText}
                    accessibilityLabel="This is your current location"
                >Your location</Text>
            }
            <View style={[
                styles.textContainer, 
                isLongPressed && styles.cardViewLongPressed,
                ]}
            >
                <Text
                    style={[styles.text, isPressed && styles.textPressed, styles.cityName]}
                    accessibilityLabel='City name'
                >{cityData.cityName}</Text>
                <WeatherIcon
                    iconCode={cityData.weather?.weatherSymbolCode || ''}
                    size='small'
                    accessible={true}
                    accessibilityLabel={`Weather icon for ${cityData.cityName}`}
                />
                <Text
                    style={[styles.text, isPressed && styles.textPressed, styles.temperature]}
                    accessibilityLabel='Temperature'
                >
                    {useTemperature(cityData.weather?.temperature ?? 0)}
                </Text>
                {isLongPressed && (
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={handleRemoveCity}
                        accessible={true}
                        accessibilityLabel={`Remove ${cityData.cityName}`}
                        accessibilityHint="Press to remove this location"
                        accessibilityRole="button"
                    >
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
        backgroundColor: 'rgba(255, 100, 100, 0.5)',
    },
    cardLongPressed: {
        backgroundColor: 'rgba(230, 230, 255, 0.6)',
    },
    cardViewLongPressed: {
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
