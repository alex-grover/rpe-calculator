'use client'

import { useEffect } from 'react'

export function NativeShell() {
  useEffect(() => {
    // iOS Safari ignores user-scalable=no in some contexts; block its proprietary pinch gestures directly.
    const preventGesture = (event: Event) => event.preventDefault()
    const preventPinch = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault()
    }
    document.addEventListener('gesturestart', preventGesture, { passive: false })
    document.addEventListener('gesturechange', preventGesture, { passive: false })
    document.addEventListener('touchmove', preventPinch, { passive: false })

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
    }

    return () => {
      document.removeEventListener('gesturestart', preventGesture)
      document.removeEventListener('gesturechange', preventGesture)
      document.removeEventListener('touchmove', preventPinch)
    }
  }, [])

  return null
}
