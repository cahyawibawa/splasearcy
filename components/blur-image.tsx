import { useState } from 'react'
import Image from 'next/image'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from './ui/button'

interface BlurImageProps {
  src: string
  alt: string
  rounded?: boolean
}

export default function BlurImage({ src, alt, rounded }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(src)
      toast.success('Copy Link successfully')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
      <Image
        fill
        alt={alt}
        src={src}
        loading="lazy"
        className={`rounded-lg object-cover duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-75 ${
          isLoading ? 'blur-md grayscale' : 'blur-0 grayscale-0'
        } ${rounded ? 'rounded-full' : ''}`}
        onLoadingComplete={() => setLoading(false)}
      />
      <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center gap-8 rounded-lg p-4 text-center opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <p className="font-medium leading-6 text-white">{alt}</p>
        <Button onClick={handleCopy}>
          <CopyIcon className="mr-2 size-4" />
          Copy URL
        </Button>
      </div>
    </div>
  )
}
