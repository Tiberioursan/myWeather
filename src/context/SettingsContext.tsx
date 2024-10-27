import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTemperatureUnit } from '../storage/storageActions'
import { TemperatureContextType } from '../types/genericInterfaces'

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<string>('Celsius')

  useEffect(() => {
    const loadSettings = async () => {
      const unit = await getTemperatureUnit()
      setTemperatureUnit(unit)
    }

    loadSettings()
  }, [])

  return (
    <TemperatureContext.Provider value={{ temperatureUnit, setTemperatureUnit }}>
      {children}
    </TemperatureContext.Provider>
  )
}

export const useTemperatureContext = () => {
  const context = useContext(TemperatureContext)
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider')
  }
  return context
}