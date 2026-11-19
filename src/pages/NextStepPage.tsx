import { Link, useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { CourtLinkList } from "../components/CourtLinkList"
import { ExternalLink } from "../components/ExternalLink"
import { SMALL_CLAIMS_LIMIT } from "../copy"
import { appraiserMapsUrl, formatMoney } from "../format"
import { usePageTitle } from "../use-page-title"

export function NextStepPage() {
  usePageTitle("Your next step")
  const navigate = useNavigate()
  const { text, files, amount, update } = useClaim()
  const money = amount === null ? "" : formatMoney(amount)
  const overSmallClaims = amount !== null && amount > SMALL_CLAIMS_LIMIT
  const mapsUrl = appraiserMapsUrl(text.appraiserCity)

  return (
    <article className="page">
      {text.path === "settlement" ? (
        <>
          <p className="kicker">Settlement path</p>
          <h1>Your next step: send the email</h1>
          <p className="lede" data-testid="next-summary">
            You chose to ask {text.insurer.trim() || "the insurance company"} to
            settle. Send the draft yourself, with the amount you entered
            {money ? ` (${money})` : ""}. This website did not calculate that
            number.
          </p>
          <ol className="plain-list">
            <li>
              Copy the settlement email and send it to the insurer. Attach the
              files yourself. This tab currently holds {files.accident.length}{" "}
              accident photo{files.accident.length === 1 ? "" : "s"},{" "}
              {files.repaired.length} after-repair photo
              {files.repaired.length === 1 ? "" : "s"}, and {files.invoice.length}{" "}
              invoice file{files.invoice.length === 1 ? "" : "s"}.
            </li>
            <li>
              An independent appraisal is recommended for proving the amount.
              Whether a court requires a licensed appraiser depends on the place.
            </li>
            <li>
              If you do not reach a settlement, you can look at filing in DC
              Small Claims instead.
            </li>
          </ol>
          <div className="actions">
            <Link className="button" to="/settlement">
              Review the email
            </Link>
            <ExternalLink className="button button-secondary" href={mapsUrl}>
              Search appraisers
            </ExternalLink>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                update({ path: "file" })
                navigate("/file")
              }}
            >
              Switch to filing
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="kicker">Filing path</p>
          <h1>Your next step: file, serve, and bring proof</h1>
          <p className="lede" data-testid="next-summary">
            You chose the court path. Suggested next step: file in DC Small
            Claims, serve the insurer, and bring the appraisal, photos, and
            invoice.
            {money
              ? ` The amount you entered is ${money}. This website did not calculate it.`
              : ""}
          </p>
          {overSmallClaims ? (
            <p className="note">
              That amount is more than $10,000. DC Courts describes Small Claims
              as $10,000 or less and Civil Actions as more than $10,000. Confirm
              where a claim for this amount belongs before you file the
              small-claims forms.
            </p>
          ) : (
            <p>
              DC Courts describes Small Claims as $10,000 or less. Landing inside
              that line does not decide the case for you.
            </p>
          )}
          <ol className="plain-list">
            <li>
              File in DC Small Claims, if that is the right branch, using the
              Statement of Claim and the Information Sheet. The court pages
              explain in person, mail, drop box, and eFiling.
            </li>
            <li>
              Serve the insurer. Use the court's handbook and the information
              sheet for service. This site does not serve anyone.
            </li>
            <li>
              Bring the appraisal, the photos, and the body-shop invoice. This
              tab holds {files.accident.length} accident photo
              {files.accident.length === 1 ? "" : "s"}, {files.repaired.length}{" "}
              after-repair photo{files.repaired.length === 1 ? "" : "s"}, and{" "}
              {files.invoice.length} invoice file
              {files.invoice.length === 1 ? "" : "s"}.
            </li>
          </ol>
          <p>
            An independent appraisal is recommended for proving the amount.
            Whether a court requires a licensed appraiser depends on the place.
          </p>
          <CourtLinkList />
          <div className="actions">
            <button type="button" className="button" onClick={() => navigate("/file")}>
              Back to the forms
            </button>
            <ExternalLink className="button button-secondary" href={mapsUrl}>
              Search appraisers
            </ExternalLink>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                update({ path: "settlement" })
                navigate("/settlement")
              }}
            >
              Switch to a settlement email
            </button>
          </div>
        </>
      )}
    </article>
  )
}
