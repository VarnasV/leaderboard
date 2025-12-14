"use client"

import { useEffect } from 'react'

export function FontLoader() {
  useEffect(() => {
    // Check if link already exists
    const existingLink = document.querySelector('link[href*="gilroy"]')
    if (existingLink) return

    // Add preconnect
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.cdnfonts.com'
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)

    // Add font stylesheet
    const link = document.createElement('link')
    link.href = 'https://fonts.cdnfonts.com/css/gilroy'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return null
}

