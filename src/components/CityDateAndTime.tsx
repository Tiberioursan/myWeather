import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getTimeZoneByCoordinates } from '../api/locationRequests'
import { TimeDisplayProps } from '../types/weatherInterfaces'

const CityDateAndTime: React.FC<TimeDisplayProps> = ({ latitude, longitude }) => {
    const [time, setTime] = useState(new Date())
    const [timeZoneOffset, setTimeZoneOffset] = useState<number | null>(null)

    useEffect(() => {

        const fetchTimeZoneOffset = async () => {
            try {
                const offset = await getTimeZoneByCoordinates(latitude, longitude)
                setTimeZoneOffset(typeof offset === 'number' ? offset : null)
            } catch (error) {  
                console.error('Failed to fetch time zone offset:', error)
            }
        }

        fetchTimeZoneOffset()

        const timerId = setInterval(() => setTime(new Date()), 10000)
        return () => clearInterval(timerId)
    }, [latitude, longitude])

    const getLocalizedDateAndTime = () => {
        if (timeZoneOffset === null) return { time: 'Loading...', date: 'Loading...' }
        
        const localTime = new Date(time.getTime() + timeZoneOffset * 3600 * 1000)
        const timeString = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateString = localTime.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })
        
        return { time: timeString, date: dateString }
    }

    const localizedDateAndTime = getLocalizedDateAndTime()
    const localTime = typeof localizedDateAndTime === 'string' ? 'Loading...' : localizedDateAndTime.time
    const localDate = typeof localizedDateAndTime === 'string' ? '' : localizedDateAndTime.date

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{localDate}</Text>
            <Text style={styles.timeText}>{localTime}</Text>
        </View>
    )
}

export default CityDateAndTime

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
    },
    dateText: {
        fontSize: 12,
        marginRight: 8,
    },
    timeText: {
        fontSize: 12,
    },
})