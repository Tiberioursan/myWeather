import Toast from 'react-native-toast-message'

export const showErrorToast = ( text2: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2,
    visibilityTime: 5000,
    autoHide: true,
  })
}