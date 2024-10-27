import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { storeTemperatureUnit } from '../storage/storageActions'
import { useTemperatureContext } from '../context/SettingsContext'
import { usePopup } from '../context/PopupContext'

const SettingsPage: React.FC = () => {
  const { temperatureUnit, setTemperatureUnit } = useTemperatureContext()
  const [selectedUnit, setSelectedUnit] = useState<string>(temperatureUnit)
  const { showPopup } = usePopup()

  useEffect(() => {
    setSelectedUnit(temperatureUnit)
  }, [temperatureUnit])

  const handleSaveSettings = async () => {
    await storeTemperatureUnit(selectedUnit)
    setTemperatureUnit(selectedUnit)
    showPopup({
      message: 'Settings saved successfully!',
      confirmText: '',
      cancelText: 'OK',
      onConfirm: null,
      onCancel: () => {},
    })
}

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        accessible={true}
        accessibilityRole="header"
      >Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Temperature Unit:</Text>
        <Picker
          selectedValue={temperatureUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          accessible={true}
          accessibilityLabel="Select temperature unit"
          accessibilityHint="Choose between Celsius and Fahrenheit"
        >
          <Picker.Item label="Celsius" value="Celsius" />
          <Picker.Item label="Fahrenheit" value="Fahrenheit" />
        </Picker>
      </View>
      <Button
        title="Save"
        onPress={() => {handleSaveSettings()}}
        accessibilityLabel="Save settings"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '60%',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
})

export default SettingsPage