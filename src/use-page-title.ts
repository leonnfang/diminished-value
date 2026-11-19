import { useEffect } from "react"

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title =
      title === "After the Repair" ? title : `${title} · After the Repair`
  }, [title])
}
