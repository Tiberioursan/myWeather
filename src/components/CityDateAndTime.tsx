import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getTimeZoneByCoordinates } from '../api/locationRequests'
import { TimeDisplayProps } from '../types/weatherInterfaces'
import { showErrorToast } from '../errors/toastService'

const CityDateAndTime: React.FC<TimeDisplayProps> = ({ latitude, longitude }) => {
    const [time, setTime] = useState(new Date())
    const [timeZoneOffset, setTimeZoneOffset] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getLocalizedDateAndTime = useCallback(() => {
        if (isLoading || timeZoneOffset === null) return { time: 'Loading...', date: 'Loading...' }
        
        const localTime = new Date(time.getTime() + timeZoneOffset * 3600 * 1000)
        const timeString = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateString = localTime.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' })
        
        return { time: timeString, date: dateString }
    }, [isLoading, timeZoneOffset, time])

    const { time: localTime, date: localDate } = getLocalizedDateAndTime()

    useEffect(() => {

        const fetchTimeZoneOffset = async () => {
            const { offset, error } = await getTimeZoneByCoordinates(latitude, longitude)

            if (error) {
                showErrorToast(error)
                return
            }

            setTimeZoneOffset(typeof offset === 'number' ? offset : null)
            setIsLoading(false)
        }

        fetchTimeZoneOffset()
    }, [latitude, longitude])

    useEffect(() => {
        if (!isLoading && timeZoneOffset !== null) {
            const timerId = setInterval(() => setTime(new Date()), 10000)
            return () => clearInterval(timerId)
        }
    }, [isLoading, timeZoneOffset])

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