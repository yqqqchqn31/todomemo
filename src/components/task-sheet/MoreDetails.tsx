import type { ReactNode } from 'react'

type MoreDetailsProps = {
  isInitiallyOpen: boolean
  children: ReactNode
}

export const MoreDetails = ({ isInitiallyOpen, children }: MoreDetailsProps) => (
  <details open={isInitiallyOpen} className="group border-t border-border">
    <summary className="flex min-h-11 cursor-pointer items-center gap-1 text-sm text-content-muted">
      くわしく決める
      <span aria-hidden="true" className="group-open:rotate-90 motion-safe:transition-transform">
        ›
      </span>
    </summary>
    <div className="flex flex-col gap-4 pt-1 pb-2">{children}</div>
  </details>
)
