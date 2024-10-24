import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { CityWeatherListProps } from '../types/weatherInterfaces'

const CityWeatherList: React.FC<CityWeatherListProps> = ({ location }) => {

    return (
        <ScrollView horizontal contentContainerStyle={styles.container}>
            <Text>City Weather List</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
})

export default CityWeatherList