import { useEffect, useState } from 'react'
import { Platform, PermissionsAndroid, Linking } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { Location } from '../types/genericInterfaces'
import { UseLocationResult } from '../types/responseInterfaces'

const useLocation = (): UseLocationResult => {
    const [location, setLocation] = useState<Location | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'myWeather Location Permission',
                            message: 'We need access to your location to show weather data',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    )
    
                    if (granted === PermissionsAndroid.RESULTS.DENIED) {
                        setError('Location permission denied')
                        return
                    }
    
                    if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        setError('Location permission denied permanently. Please enable it from settings.')
                        Linking.openSettings().catch(() => {
                            setError('Unable to open app settings')
                        })
                        return
                    }
                }
    
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setLocation({ latitude, longitude })
                    },
                    (positionError: Geolocation.GeoError) => {
                        setError(`Error getting location: ${positionError.message}`)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                )
            }
            catch (error) {
                setError(`Error while requesting location permission: ${error}`)
            }
        }

        requestLocationPermission()
    }, [])

    return { location, error }
}

export default useLocation