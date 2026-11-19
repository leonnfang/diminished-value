import { useLocation, useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { stepsFor } from "../flow"

export function Progress() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { text, intakeComplete, hasEstimate } = useClaim()

  if (pathname === "/" || pathname === "/outside-dc") return null

  const steps = stepsFor(text.path)
  const index = steps.findIndex((step) => step.href === pathname)
  if (index < 0) return null

  function openable(href: string): boolean {
    if (href === "/intake") return true
    if (!intakeComplete) return false
    if (href === "/jurisdiction") return true
    if (text.jurisdiction !== "dc") return false
    if (href === "/path") return true
    if (!text.path) return false
    if (href === "/settlement") return text.path === "settlement"
    if (href === "/file") return text.path === "file"
    if (href === "/appraisal") return true
    if (href === "/next") return hasEstimate
    return false
  }

  return (
    <nav className="progress" aria-label="Guide steps">
      <p className="progress-label">
        Step {index + 1} of {steps.length}
        <span> · {steps[index]?.label}</span>
      </p>
      <ol>
        {steps.map((step, stepIndex) => {
          const current = stepIndex === index
          const enabled = stepIndex < index && openable(step.href)
          return (
            <li key={step.href}>
              <button
                type="button"
                aria-current={current ? "step" : undefined}
                disabled={!enabled}
                onClick={() => navigate(step.href)}
              >
                <span className="progress-index">{stepIndex + 1}</span>
                <span className="progress-name">{step.label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
