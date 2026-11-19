import { Link } from "react-router-dom"
import { useClaim } from "../claim-context"
import { resumeHref } from "../flow"
import { usePageTitle } from "../use-page-title"

export function HomePage() {
  usePageTitle("After the Repair")
  const { text, intakeComplete, hasEstimate, dirty } = useClaim()
  const href = dirty ? resumeHref(text, intakeComplete, hasEstimate) : "/intake"

  return (
    <article className="page page-wide">
      <p className="kicker">Washington, DC · for car owners</p>
      <h1>Walk through a diminished-value claim</h1>
      <p className="lede">
        After a repair, a car can be worth less than a similar car that was never
        in an accident. That difference is called diminished value. This guide
        helps you organize the accident and pick a next step. The first version
        covers accidents in Washington, DC.
      </p>
      <p>
        It is not a law firm. It does not calculate your loss, file a case, or
        promise a result.
      </p>
      <ol className="steps-preview">
        <li>
          <strong>Describe the accident</strong>
          <span>Add photos and the body-shop invoice. They stay in this browser tab.</span>
        </li>
        <li>
          <strong>Say where it happened</strong>
          <span>Washington, DC can continue. Other places stop here.</span>
        </li>
        <li>
          <strong>Pick a path</strong>
          <span>Draft a settlement email, or see how a DC court claim works.</span>
        </li>
        <li>
          <strong>Support the dollar amount</strong>
          <span>An independent appraisal is the usual proof. You look up appraisers yourself.</span>
        </li>
      </ol>
      <div className="actions">
        <Link className="button" to={href} data-testid="start-guide">
          {dirty ? "Continue the guide" : "Start the guide"}
        </Link>
      </div>
    </article>
  )
}
