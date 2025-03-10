import { BridgesMvpWarning } from '~/app/(side-nav)/bridges/_components/bridges-mvp-warning'
import { ScrollToTopButton } from '~/components/scroll-to-top-button'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BridgesMvpWarning className="w-full" />
      {children}
      <ScrollToTopButton />
    </>
  )
}
