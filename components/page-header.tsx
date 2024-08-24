// @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  withPadding?: boolean
}

function PageHeader({
  className,
  children,
  as: Comp = 'section',
  withPadding = false,
  ...props
}: PageHeaderProps) {
  return (
    <Comp
      className={cn(
        'flex max-w-[61.25rem] flex-col gap-1',
        withPadding && 'py-8  md:py-12 md:pb-8 lg:py-24 lg:pb-20',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

const headingVariants = cva('font-semibold text-gray-900 tracking-tighter', {
  variants: {
    size: {
      default: 'text-3xl md:text-5xl',
      sm: 'text-2xl md:text-4xl',
      lg: 'text-3xl sm:text-5xl md:text-5xl lg:text-6xl',
      xl: 'text-4xl sm:text-5xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function PageHeaderHeading({
  className,
  size,
  as: Comp = 'h1',
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  )
}

const descriptionVariants = cva('text-balance text-gray-700', {
  variants: {
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm',
      lg: 'text-lg sm:text-xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface PageHeaderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {}

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <p className={cn(descriptionVariants({ size, className }))} {...props} />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center space-x-4 py-4 md:pb-10',
        className
      )}
      {...props}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
