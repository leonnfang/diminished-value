import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useClaim } from "../claim-context"

type Need = "place" | "other" | "choose" | "settle" | "appraisal" | "file" | "next"

export function Gate({ need, children }: { need: Need; children: ReactNode }) {
  const { intakeComplete, text, hasEstimate } = useClaim()

  if (!intakeComplete) return <Navigate to="/intake" replace />
  if (need === "place") return children

  if (!text.jurisdiction) return <Navigate to="/jurisdiction" replace />

  if (need === "other") {
    if (text.jurisdiction !== "other") return <Navigate to="/path" replace />
    return children
  }

  if (text.jurisdiction !== "dc") return <Navigate to="/outside-dc" replace />
  if (need === "choose") return children

  if (need === "appraisal") {
    if (!text.path) return <Navigate to="/path" replace />
    return children
  }

  if (need === "settle") {
    if (text.path !== "settlement") return <Navigate to="/path" replace />
    return children
  }

  if (need === "file") {
    if (text.path !== "file") return <Navigate to="/path" replace />
    return children
  }

  if (!text.path) return <Navigate to="/path" replace />
  if (!hasEstimate) {
    return <Navigate to={text.path === "file" ? "/file" : "/settlement"} replace />
  }
  return children
}
