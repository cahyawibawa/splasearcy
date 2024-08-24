import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import PhotoGallery from '@/components/photos/photo-gallery'
import ScrollToTop from '@/components/scroll-top'
import Search from '@/components/search'

export default function IndexPage() {
  return (
    <>
      <PageHeader
        as="section"
        className="mx-auto items-center gap-2 text-center"
        withPadding
      >
        <PageHeaderHeading
          className="animate-fade-up font-sans text-[22px] sm:text-[30px] md:text-[36px]"
          style={{ animationDelay: '0.20s', animationFillMode: 'both' }}
        >
          What can I find photos for you today?
        </PageHeaderHeading>
        <PageHeaderDescription
          className="animate-fade-up"
          size="sm"
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
        >
          Explore endless inspiration that helps you find the stock photo for
          your project.
        </PageHeaderDescription>
        <PageActions
          className="animate-fade-up"
          style={{ animationDelay: '0.40s', animationFillMode: 'both' }}
        >
          <div className="sticky top-0 z-50 flex w-full items-center justify-center py-1.5">
            <div className="flex w-full max-w-2xl items-center justify-center">
              <Search />
            </div>
          </div>
        </PageActions>
      </PageHeader>

      <PhotoGallery />

      <ScrollToTop />
    </>
  )
}
