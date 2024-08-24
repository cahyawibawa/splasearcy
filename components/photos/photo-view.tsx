import Image from 'next/image'

import { usePhotoStore } from '@/lib/use-photo-store'

import { Dialog, DialogContent } from '../ui/dialog'

export default function PhotoView() {
  const selectedPhoto = usePhotoStore((state) => state.selectedPhoto)
  const isViewOpen = usePhotoStore((state) => state.isViewOpen)
  const setIsViewOpen = usePhotoStore((state) => state.setIsViewOpen)

  if (!selectedPhoto) return null

  return (
    <Dialog open={isViewOpen} onOpenChange={(open) => setIsViewOpen(open)}>
      <DialogContent className="top-1/2 max-w-[425px] -translate-y-1/2 p-0 sm:max-w-[500px]">
        <div className="relative">
          <Image
            src={selectedPhoto.urls.regular}
            alt={selectedPhoto.alt_description || ''}
            width={800}
            height={600}
            className="rounded-lg"
          />
          <a
            href={selectedPhoto.user.portfolio_url}
            target="_blank"
            className="absolute bottom-5 left-5 min-w-[320px] rounded-lg bg-[#0F172A]/30 p-4 backdrop-blur-lg"
            rel="noreferrer"
          >
            <div className="flex items-center gap-4">
              <Image
                src={selectedPhoto.user.profile_image.large}
                alt={selectedPhoto.user.username}
                width={56}
                height={56}
                className="rounded-full"
              />
              <p className="text-base font-medium text-white">
                {selectedPhoto.user.username}
              </p>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
