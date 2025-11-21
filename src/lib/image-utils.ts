/**
 * Utility functions for image handling
 */

import type { Images } from '@/types/common'

/**
 * Gathers all images from an Images object into a flat array
 * @param images - Images object with primary and optional others
 * @returns Array of image paths
 */
export function gatherImages(images?: Images): string[] {
  if (!images) return []

  const result: string[] = []

  if (images.primary) {
    result.push(images.primary)
  }

  if (images.others && Array.isArray(images.others)) {
    result.push(...images.others)
  }

  return result
}
