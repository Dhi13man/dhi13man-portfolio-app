/**
 * Intersection Observer hooks for scroll-triggered animations
 * - Animate elements as they enter viewport
 * - Respects prefers-reduced-motion
 * - Optimized performance with proper cleanup
 */

'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

/**
 * Hook to detect when an element enters the viewport
 * Returns a ref to attach to the element and a boolean indicating visibility
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}): [React.RefObject<T | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // If already visible and freeze is enabled, don't observe
    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting || prefersReducedMotion

        setIsVisible(visible)

        // Unobserve if element is visible and freeze is enabled
        if (visible && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible])

  return [ref, isVisible]
}

/**
 * Hook to animate elements on scroll with configurable animation classes
 * Usage:
 * const ref = useScrollAnimation('animate-fade-in')
 */
export function useScrollAnimation<T extends HTMLElement>(
  animationClass: string = 'animate-fade-in',
  options?: UseIntersectionObserverOptions
): React.RefObject<T | null> {
  const [ref, isVisible] = useIntersectionObserver<T>({
    ...options,
    freezeOnceVisible: true, // Only animate once
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (isVisible) {
      element.classList.add(animationClass)
    }
  }, [isVisible, animationClass, ref])

  return ref
}

/**
 * Hook to detect if multiple elements are in viewport
 * Useful for staggered animations
 */
export function useMultipleIntersectionObserver<T extends Element>(
  options?: UseIntersectionObserverOptions
): [(node: T | null, index: number) => void, boolean[]] {
  const [visibilityMap, setVisibilityMap] = useState<Map<number, boolean>>(new Map())
  const refsMap = useRef<Map<number, T>>(new Map())
  const observersMap = useRef<Map<number, IntersectionObserver>>(new Map())

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const setRef = (node: T | null, index: number) => {
    if (!node) {
      // Cleanup observer when node is removed
      const observer = observersMap.current.get(index)
      observer?.disconnect()
      observersMap.current.delete(index)
      refsMap.current.delete(index)
      return
    }

    refsMap.current.set(index, node)

    // Show immediately if reduced motion is preferred
    if (prefersReducedMotion) {
      setVisibilityMap((prev) => new Map(prev).set(index, true))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibilityMap((prev) => {
          const newMap = new Map(prev)
          newMap.set(index, entry.isIntersecting)
          return newMap
        })

        if (entry.isIntersecting && options?.freezeOnceVisible) {
          observer.unobserve(node)
        }
      },
      {
        threshold: options?.threshold ?? 0,
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
      }
    )

    observer.observe(node)
    observersMap.current.set(index, observer)
  }

  useEffect(() => {
    const observers = observersMap.current
    return () => {
      // Cleanup all observers on unmount
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const visibilityArray = Array.from(visibilityMap.values())
  return [setRef, visibilityArray]
}

/**
 * Hook to create staggered fade-in animations for lists
 * Usage:
 * const setItemRef = useStaggeredAnimation()
 * items.map((item, i) => <div ref={(node) => setItemRef(node, i)} key={i}>...</div>)
 */
export function useStaggeredAnimation<T extends HTMLElement>(
  animationClass: string = 'animate-fade-in',
  staggerDelay: number = 100 // ms between each item
): (node: T | null, index: number) => void {
  const [setRef, visibilityArray] = useMultipleIntersectionObserver<T>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      // Clear all timeouts on unmount
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  const wrappedSetRef = (node: T | null, index: number) => {
    setRef(node, index)

    if (!node) return

    // Apply animation when element becomes visible
    if (visibilityArray[index]) {
      const timeout = setTimeout(() => {
        node.classList.add(animationClass)
      }, index * staggerDelay)

      timeoutsRef.current.set(index, timeout)
    }
  }

  return wrappedSetRef
}
