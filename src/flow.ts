import type { ClaimPath, TextDraft } from "./types"

export function stepsFor(path: ClaimPath): { href: string; label: string }[] {
  const head = [
    { href: "/intake", label: "Intake" },
    { href: "/jurisdiction", label: "Place" },
    { href: "/path", label: "Path" },
  ]
  if (path === "file") {
    return [
      ...head,
      { href: "/appraisal", label: "Appraisal" },
      { href: "/file", label: "File" },
      { href: "/next", label: "Next" },
    ]
  }
  return [
    ...head,
    { href: "/settlement", label: "Settle" },
    { href: "/appraisal", label: "Appraisal" },
    { href: "/next", label: "Next" },
  ]
}

export function resumeHref(
  text: TextDraft,
  intakeComplete: boolean,
  hasEstimate: boolean,
): string {
  if (!intakeComplete) return "/intake"
  if (text.jurisdiction === "other") return "/outside-dc"
  if (text.jurisdiction !== "dc") return "/jurisdiction"
  if (text.path === "settlement") return hasEstimate ? "/appraisal" : "/settlement"
  if (text.path === "file") return hasEstimate ? "/file" : "/appraisal"
  return "/path"
}
