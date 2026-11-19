import type { ReactNode } from "react"

export function ExternalLink({
  href,
  className,
  testId,
  children,
}: {
  href: string
  className?: string
  testId?: string
  children: ReactNode
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
