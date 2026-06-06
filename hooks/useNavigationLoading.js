// hooks/useNavigationLoading.js
'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useNavigationLoading() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a')
      
      if (link && link.href) {
        const url = new URL(link.href)
        const currentUrl = new URL(window.location.href)
        
        // Only show loading for internal navigation
        if (url.origin === currentUrl.origin && 
            url.pathname !== currentUrl.pathname &&
            !link.target && 
            !e.ctrlKey && 
            !e.metaKey) {
          setLoading(true)
        }
      }
    }

    // Listen to all clicks on the document
    document.addEventListener('click', handleClick, { capture: true })
    
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [])

  return loading
}