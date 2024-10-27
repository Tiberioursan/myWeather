import { CityData } from './weatherInterfaces'
import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
    Home: undefined
    CityDetail: { cityData: CityData }
    Settings: undefined
}

export interface CityDetailRouteParams {
    params: {
        cityData: CityData
    }
}

type CityDetailScreenRouteProp = RouteProp<RootStackParamList, 'CityDetail'>
export interface CityDetailScreenProps {
    route: CityDetailScreenRouteProp
}