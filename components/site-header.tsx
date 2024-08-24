import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20">
      <div className="flex w-full flex-col justify-between gap-3 bg-white p-3 backdrop-blur  supports-[backdrop-filter]:bg-white/60 md:h-16 md:flex-row md:items-center lg:px-4 ">
        <div className="flex w-full items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="size-6 grayscale" />
            {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
          </Link>
          <nav className="ml-auto flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })}
              >
                <Icons.gitHub className="size-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
    // todo : add filter navigation
  )
}
