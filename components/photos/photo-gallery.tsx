'use client'

import { useCallback, useEffect, useRef } from 'react'

import { usePhotoStore } from '@/lib/use-photo-store'
import { Skeleton } from '@/components/ui/skeleton'

import PhotoCard from './photo-card'
import PhotoView from './photo-view'

export default function PhotoGallery() {
  const { photos, fetchPhotos, incrementPage, hasMore } = usePhotoStore()
  const observer = useRef<IntersectionObserver | null>(null)

  const lastPhotoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          incrementPage()
          fetchPhotos()
        }
      })
      observer.current.observe(node)
    },
    [fetchPhotos, incrementPage, hasMore]
  )

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <div key={`skeleton-${index}`} className="aspect-square">
        <Skeleton className="size-full rounded-lg" />
      </div>
    ))
  }

  return (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {photos.length === 0
          ? renderSkeletons()
          : photos.map((photo, index) => (
              <div
                key={photo.id}
                ref={index === photos.length - 1 ? lastPhotoElementRef : null}
              >
                <PhotoCard photo={photo} />
              </div>
            ))}
      </div>
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-8 w-32" />
        </div>
      )}
      <PhotoView />
    </div>
  )
}
