import React, { createContext, useContext, useState, ReactNode, Context } from 'react'

interface PopupContent {
    message: string,
    confirmText: string,
    cancelText: string,
    onConfirm: (() => void) | null,
    onCancel: () => void
}

interface PopupContextType {
    isVisible: boolean,
    popupContent: PopupContent,
    showPopup: (content: PopupContent) => void,
    hidePopup: () => void
}

const defaultPopupContent: PopupContent = {
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    onCancel: () => {}
}

const PopupContext: Context<PopupContextType> = createContext<PopupContextType>({
  isVisible: false,
  popupContent: defaultPopupContent,
  showPopup: () => {},
  hidePopup: () => {}
})

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [popupContent, setPopupContent] = useState<PopupContent>(defaultPopupContent)

  const showPopup = (content: PopupContent) => {
    setPopupContent(content)
    setIsVisible(true)
  }

  const hidePopup = () => {
    setIsVisible(false)
  }

  return (
    <PopupContext.Provider value={{ isVisible, popupContent, showPopup, hidePopup }}>
        {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)