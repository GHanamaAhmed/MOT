// use-mobile.ts
import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768
      if (isMobileView !== isMobile) {
        setIsMobile(isMobileView)
      }
    }

    // Initial check
    checkMobile()

    // Add event listeners
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [isMobile])

  return isMobile
}
