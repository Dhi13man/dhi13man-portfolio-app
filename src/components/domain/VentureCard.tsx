import * as React from 'react'
import { Panel } from '@/components/ui/panel'
import { ImageGallery } from '@/components/ui/image-gallery'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { Venture } from '@/types/venture'

export interface VentureCardProps {
  venture: Venture
}

export function VentureCard({ venture }: VentureCardProps) {
  // Gather all images (primary + others)
  const allImages = venture.images
    ? [venture.images.primary, ...(venture.images.others || [])].filter(Boolean) as string[]
    : []

  return (
    <Panel hoverable>
      {/* Venture images */}
      {allImages.length > 0 && (
        <div className="mb-3">
          <ImageGallery
            images={allImages}
            alt={venture.name}
            thumbnailSize="md"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-16 font-semibold text-text-primary mb-1">
            {venture.name}
          </h4>
          <p className="text-14 text-text-secondary line-clamp-2">
            {venture.about}
          </p>
        </div>
        {venture.links?.primary && (
          <Link
            href={venture.links.primary}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-accent hover:text-accent-hover transition-colors duration-fast"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>
    </Panel>
  )
}
