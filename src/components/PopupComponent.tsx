import React from 'react'
import { View, Text, Button, Modal, StyleSheet } from 'react-native'
import { usePopup } from '../context/PopupContext'

const PopupComponent = () => {
    const { isVisible, popupContent, hidePopup } = usePopup()

    if (!isVisible) return null

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="fade"
            onRequestClose={hidePopup}
        >
            <View style={styles.overlay}>
                <View style={styles.popupContainer}>
                    <Text style={styles.message}>{popupContent.message}</Text>
                    <View style={styles.buttonContainer}>
                        {popupContent.confirmText &&
                            <Button
                                color='red'
                                title={popupContent.confirmText}
                                onPress={() => {
                                    popupContent.onConfirm && popupContent.onConfirm()
                                    hidePopup()
                                }}
                            />
                        }
                        <Button
                            title={popupContent.cancelText}
                            onPress={() => {
                                popupContent.onCancel()
                                hidePopup()
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        alignItems: 'center'
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})

export default PopupComponent