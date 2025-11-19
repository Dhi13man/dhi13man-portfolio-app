/**
 * Skeleton loading component following Linear design system
 * - Flat, minimal loading states
 * - Subtle pulse animation
 * - Accessible with aria-busy attribute
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animate?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, animate = true, ...props }, ref) => {
    const variantStyles = {
      text: 'h-4 w-full rounded',
      circular: 'rounded-full',
      rectangular: 'rounded',
    }

    const style = {
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label="Loading..."
        className={cn(
          'bg-border',
          animate && 'animate-pulse',
          variantStyles[variant],
          className
        )}
        style={style}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)
Skeleton.displayName = 'Skeleton'

/**
 * Pre-built skeleton layouts for common patterns
 */

// Skeleton for Panel component
const SkeletonPanel = () => (
  <div className="bg-surface border border-border rounded p-4 space-y-3">
    <Skeleton variant="text" width="60%" height={20} />
    <Skeleton variant="text" width="40%" height={14} />
    <Skeleton variant="text" width="100%" height={14} />
    <Skeleton variant="text" width="100%" height={14} />
    <Skeleton variant="text" width="80%" height={14} />
  </div>
)

// Skeleton for Timeline item
const SkeletonTimelineItem = () => (
  <div className="relative pl-6 pb-6">
    <div className="absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 border-border bg-background" />
    <div className="space-y-2">
      <Skeleton variant="text" width="50%" height={20} />
      <Skeleton variant="text" width="30%" height={12} />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="70%" height={14} />
    </div>
  </div>
)

// Skeleton for profile/avatar
const SkeletonAvatar = ({ size = 128 }: { size?: number }) => (
  <Skeleton variant="circular" width={size} height={size} />
)

// Skeleton for card with image
const SkeletonCard = () => (
  <div className="bg-surface border border-border rounded overflow-hidden">
    <Skeleton variant="rectangular" height={200} animate={false} />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="40%" height={14} />
      <Skeleton variant="text" width="100%" height={14} />
      <Skeleton variant="text" width="100%" height={14} />
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rectangular" width={60} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={70} height={24} />
      </div>
    </div>
  </div>
)

// Skeleton for page header
const SkeletonPageHeader = () => (
  <div className="space-y-4">
    <Skeleton variant="text" width="40%" height={32} />
    <Skeleton variant="text" width="60%" height={16} />
  </div>
)

export {
  Skeleton,
  SkeletonPanel,
  SkeletonTimelineItem,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonPageHeader,
}
