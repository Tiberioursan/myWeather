import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import { BackgroundWrapperProps } from '../types/weatherInterfaces'

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          {children}
        </SafeAreaView>
      </ImageBackground>
    )
  }
  
  const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
  })
  
  export default BackgroundWrapper