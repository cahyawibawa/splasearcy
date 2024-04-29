import { buttonVariants } from '@/components/ui/button'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import RQPhotoList from '@/components/photo-list'
import QueryProvider from '@/components/query-provider'
import ScrollToTop from '@/components/scroll-top'
import Search from '@/components/search'
import { Shell } from '@/components/shell'

export default function IndexPage() {
  return (
    <Shell>
      <PageHeader
        as="section"
        className="mx-auto items-center gap-2 text-center"
        withPadding
      >
        <PageHeaderHeading
          className="animate-fade-up"
          style={{ animationDelay: '0.20s', animationFillMode: 'both' }}
          size="lg"
        >
          Where the world of images lives
        </PageHeaderHeading>
        <PageHeaderDescription
          className="max-w-[46.875rem] animate-fade-up"
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
        >
          Explore endless inspiration that helps you find the stock photo for
          your project.
        </PageHeaderDescription>
        <PageActions
          className="animate-fade-up"
          style={{ animationDelay: '0.40s', animationFillMode: 'both' }}
        >
          <Search />
        </PageActions>
      </PageHeader>

      <QueryProvider>
        <RQPhotoList />
      </QueryProvider>
      <ScrollToTop />
    </Shell>
  )
}
