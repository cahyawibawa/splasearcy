import { MouseEvent, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DownloadIcon, Loader2, UserCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Photo, usePhotoStore } from '@/lib/use-photo-store'

import { Button } from '../ui/button'

interface PhotoCardProps {
  photo: Photo
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const [isLoading, setLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const setSelectedPhoto = usePhotoStore((state) => state.setSelectedPhoto)
  const setIsViewOpen = usePhotoStore((state) => state.setIsViewOpen)

  const handleClick = () => {
    setSelectedPhoto(photo)
    setIsViewOpen(true)
  }

  const handleDownload = async (e: MouseEvent) => {
    e.stopPropagation()
    setIsDownloading(true)

    try {
      const trackDownloadResponse = await fetch(
        `https://api.unsplash.com/photos/${photo.id}/download?client_id=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      if (!trackDownloadResponse.ok)
        throw new Error('Failed to trigger download event')

      const downloadUrl = photo.urls.raw

      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${photo.alt_description || 'unsplash-image'}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('Full resolution image downloaded successfully')
    } catch (err) {
      console.error('Failed to download: ', err)
      toast.error('Failed to download image')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      className="bg-muted group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
      onClick={handleClick}
    >
      <Image
        fill
        alt={photo.alt_description || ''}
        src={photo.urls.small}
        loading="lazy"
        className={`rounded-lg object-cover duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-75 ${
          isLoading ? 'blur-md grayscale' : 'blur-0 grayscale-0'
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center space-x-2">
          {photo.user.profile_image?.large ? (
            <Image
              src={photo.user.profile_image.large}
              alt={photo.user.username}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <UserCircle className="size-6 text-white" />
          )}
          <span className="text-sm font-medium text-white">
            {photo.user.username}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="line-clamp-2 text-sm font-light text-white">
            {photo.alt_description}
          </p>
          <Button
            size="sm"
            variant="default"
            onClick={handleDownload}
            disabled={isDownloading}
            className="ml-2 bg-white bg-opacity-20 hover:bg-opacity-30"
          >
            {isDownloading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <DownloadIcon className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
