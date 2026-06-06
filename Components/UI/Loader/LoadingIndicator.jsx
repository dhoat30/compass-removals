// components/LoadingIndicator.js
'use client'
import { useNavigationLoading } from "@/hooks/useNavigationLoading"
export default function LoadingIndicator() {
  const loading = useNavigationLoading()

  if (!loading) return null

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: "64px",
          left: 0,
          height: '8px',
          width: '100%',
          backgroundColor: 'var(--light-primary)',
          zIndex: 1000,
          animation: 'loadingBar 2s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
            opacity: 1;
          }
          50% {
            transform: translateX(0%);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

// Alternative version with Tailwind classes (if you prefer)
export function LoadingIndicatorTailwind() {
  const loading = useNavigationLoading()

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 h-1 w-full bg-blue-600 z-50 animate-pulse" />
  )
}