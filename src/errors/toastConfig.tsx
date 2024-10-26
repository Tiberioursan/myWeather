import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ToastConfigParams } from 'react-native-toast-message'

const toastConfig = {
  error: (params: ToastConfigParams<any>) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>{params.text1}</Text>
      <Text style={styles.errorText}>{params.text2}</Text>
    </View>
  ),
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderLeftColor: 'red',
    borderLeftWidth: 5,
    padding: 10,
    borderRadius: 5,
  },
  errorTitle: {
    fontSize: 17,
    color: 'white',
  },
  errorText: {
    fontSize: 15,
    color: 'white',
  },
})

export default toastConfig