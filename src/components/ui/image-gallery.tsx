"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  thumbnailSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

export const ImageGallery = memo(function ImageGallery({
  images,
  alt,
  className = "",
  imageClassName = "",
  thumbnailSize = "md",
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const handleThumbnailKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(index);
    }
  };

  // Single image layout
  if (images.length === 1) {
    return (
      <>
        <div className={className}>
          {imageErrors.has(0) ? (
            <div
              className={`${sizeClasses[thumbnailSize]} rounded border border-border bg-surface flex items-center justify-center ${imageClassName}`}
            >
              <span className="text-12 text-text-tertiary">Image unavailable</span>
            </div>
          ) : (
            <div
              className={`relative ${sizeClasses[thumbnailSize]} rounded overflow-hidden border border-border bg-surface cursor-pointer hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors ${imageClassName}`}
              onClick={() => openLightbox(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleThumbnailKeyDown(e, 0)}
              aria-label={`View ${alt}`}
            >
              <Image
                src={images[0]}
                alt={alt}
                fill
                className="object-contain p-1"
                sizes={`${sizeClasses[thumbnailSize].split(" ")[0].replace("w-", "")}px`}
                onError={() => handleImageError(0)}
              />
            </div>
          )}
        </div>

        <Lightbox
          isOpen={lightboxOpen}
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onKeyDown={handleKeyDown}
          alt={alt}
        />
      </>
    );
  }

  // Multiple images layout
  return (
    <>
      <div className={`flex gap-2 ${className}`}>
        {images.map((image, index) => (
          imageErrors.has(index) ? (
            <div
              key={`error-${index}`}
              className={`${sizeClasses[thumbnailSize]} rounded border border-border bg-surface flex items-center justify-center ${imageClassName}`}
            >
              <span className="text-10 text-text-tertiary">N/A</span>
            </div>
          ) : (
            <div
              key={`image-${index}`}
              className={`relative ${sizeClasses[thumbnailSize]} rounded overflow-hidden border border-border bg-surface cursor-pointer hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors ${imageClassName}`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${alt} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes={`${sizeClasses[thumbnailSize].split(" ")[0].replace("w-", "")}px`}
                onError={() => handleImageError(index)}
              />
              {index === 0 && images.length > 1 && (
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-accent/80 backdrop-blur-sm text-12 font-mono text-background font-semibold rounded">
                  +{images.length - 1}
                </div>
              )}
            </div>
          )
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onKeyDown={handleKeyDown}
        alt={alt}
      />
    </>
  );
});

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  alt: string;
}

function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onKeyDown,
  alt,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and initial focus
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    // Focus the close button when lightbox opens
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <Button
        ref={closeButtonRef}
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Previous button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {/* Image */}
      <div
        key={currentIndex}
        className="relative max-w-7xl max-h-[90vh] w-full h-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="img"
        aria-label={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface/90 backdrop-blur-md border border-accent/30 rounded-lg text-14 font-mono text-accent"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
