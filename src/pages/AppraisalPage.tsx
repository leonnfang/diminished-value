import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { ExternalLink } from "../components/ExternalLink"
import { appraiserMapsUrl, appraiserQuery } from "../format"
import { usePageTitle } from "../use-page-title"

export function AppraisalPage() {
  usePageTitle("Independent appraisal")
  const navigate = useNavigate()
  const { text } = useClaim()
  const query = appraiserQuery(text.appraiserCity)
  const mapsUrl = appraiserMapsUrl(text.appraiserCity)
  const filing = text.path === "file"

  return (
    <article className="page">
      <p className="kicker">{filing ? "Before you file" : "Support the amount"}</p>
      <h1>An appraisal is the usual proof of the dollar loss</h1>
      <p className="lede">
        A body-shop invoice shows what the repair cost. It does not, by itself,
        show how much the car's market value changed. An independent appraisal is
        the usual way to prove that dollar loss.
      </p>
      <p className="recommend">
        <span className="pill">Recommended</span>
        Finding an appraiser is recommended if you want to prove the amount. This
        website does not require you to hire one before you continue, and hiring
        one does not guarantee a result.
      </p>
      <p>
        Whether a court requires a licensed appraiser depends on the place. Do not
        assume a rule from another state applies in DC, and do not assume DC has
        no rule. If you need to know what a court will accept, confirm it with an
        attorney or the court.
      </p>
      <section className="callout">
        <h2>Find appraisers near you</h2>
        <p>
          This opens Google Maps in a new tab and searches for{" "}
          <strong>{query}</strong>. There is no map account connected to this
          site. You choose who to contact.
        </p>
        <ExternalLink className="button" href={mapsUrl} testId="maps-link">
          Search appraisers on Google Maps
        </ExternalLink>
      </section>
      <div className="actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate(filing ? "/path" : "/settlement")}
        >
          Back
        </button>
        <button
          type="button"
          className="button"
          data-testid="appraisal-continue"
          onClick={() => navigate(filing ? "/file" : "/next")}
        >
          {filing ? "Continue to filing" : "Continue to your next step"}
        </button>
      </div>
    </article>
  )
}
