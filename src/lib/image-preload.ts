/**
 * Image preloading utilities for performance optimization
 * - Preload critical images for faster LCP
 * - Lazy load images with intersection observer
 * - Responsive image loading strategies
 */

/**
 * Preload a critical image to improve LCP
 * Use this for above-the-fold images like hero images or profile photos
 */
export function preloadImage(src: string, priority: 'high' | 'low' = 'high'): void {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  if (priority === 'high') {
    link.setAttribute('fetchpriority', 'high')
  }
  document.head.appendChild(link)
}

/**
 * Preload multiple images
 */
export function preloadImages(sources: string[], priority: 'high' | 'low' = 'low'): void {
  sources.forEach((src) => preloadImage(src, priority))
}

/**
 * Hook for preloading images on component mount
 * Usage: useImagePreload('/assets/hero.webp', 'high')
 */
export function useImagePreload(src: string | string[], priority: 'high' | 'low' = 'low'): void {
  if (typeof window === 'undefined') return

  const sources = Array.isArray(src) ? src : [src]
  
  // Preload on mount
  if (typeof window !== 'undefined') {
    preloadImages(sources, priority)
  }
}

/**
 * Get responsive image sources based on viewport width
 * Useful for art-directed responsive images
 */
export function getResponsiveImageSrc(
  sources: {
    mobile?: string
    tablet?: string
    desktop: string
  },
  currentWidth?: number
): string {
  if (typeof window === 'undefined') return sources.desktop

  const width = currentWidth ?? window.innerWidth

  if (width < 768 && sources.mobile) {
    return sources.mobile
  } else if (width < 1024 && sources.tablet) {
    return sources.tablet
  }
  return sources.desktop
}

/**
 * Check if an image is cached in the browser
 */
export function isImageCached(src: string): boolean {
  if (typeof window === 'undefined') return false

  const img = new Image()
  img.src = src
  return img.complete
}

/**
 * Lazy load image with intersection observer
 * Returns a ref to attach to the image element
 */
export function useLazyImage(onLoad?: () => void) {
  if (typeof window === 'undefined') {
    return { ref: null }
  }

  const imgRef = { current: null as HTMLImageElement | null }

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            const img = imgRef.current
            const dataSrc = img.getAttribute('data-src')
            if (dataSrc) {
              img.src = dataSrc
              img.removeAttribute('data-src')
              onLoad?.()
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
      }
    )

    return {
      ref: (node: HTMLImageElement | null) => {
        if (node) {
          imgRef.current = node
          observer.observe(node)
        }
      },
    }
  }

  return { ref: null }
}
