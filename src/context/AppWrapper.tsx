import React, { ReactNode } from 'react'
import { PopupProvider } from '../context/PopupContext'
import { TemperatureProvider } from '../context/SettingsContext'
import PopupComponent from '../components/PopupComponent'
import Toast from 'react-native-toast-message'
import toastConfig from '../errors/toastConfig'

const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TemperatureProvider>
        <PopupProvider>
            {children}
            <PopupComponent />
            <Toast config={toastConfig} />
        </PopupProvider>
    </TemperatureProvider>
  )
}

export default AppWrapper