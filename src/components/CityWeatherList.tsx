import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'

const CityWeatherList: React.FC = () => {

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