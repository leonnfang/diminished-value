import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { CourtLinkList } from "../components/CourtLinkList"
import { EstimateField } from "../components/EstimateField"
import { SMALL_CLAIMS_LIMIT } from "../copy"
import { formatMoney } from "../format"
import { usePageTitle } from "../use-page-title"

export function FileClaimPage() {
  usePageTitle("File a claim")
  const navigate = useNavigate()
  const { amount } = useClaim()
  const [attempted, setAttempted] = useState(false)
  const error =
    attempted && amount === null
      ? "Enter an amount greater than zero, such as 1800. This site will not calculate one for you."
      : ""

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (amount === null) {
      setAttempted(true)
      document.getElementById("estimate")?.focus()
      return
    }
    navigate("/next")
  }

  return (
    <article className="page">
      <p className="kicker">Filing path</p>
      <h1>Small claims, or a regular civil claim</h1>
      <p className="lede">
        These are two different ways to ask a DC court for money. This page
        describes what the DC Courts website says, in plain language. It is not
        a set of filing instructions for your case.
      </p>

      <section className="stack">
        <div>
          <h2>Small claims</h2>
          <p>
            The DC Courts site describes Small Claims as cases seeking $10,000 or
            less. It says the branch is less formal than other civil cases, and
            that the process is set up so most people do not need a lawyer. That
            same page says a business that files a small-claims case must have a
            lawyer. This website is not deciding whether you need one.
          </p>
          <p>
            To start, the court says you file a Statement of Claim and an
            Information Sheet. The statement names the parties, says why you
            believe you are owed money, and asks for an amount of $10,000 or less.
          </p>
        </div>
        <div>
          <h2>A regular civil claim</h2>
          <p>
            The DC Courts site describes the Civil Actions branch as cases for
            more than $10,000, along with some non-money cases. That is the
            ordinary civil lawsuit. It is more formal than small claims. The Civil
            Actions page also mentions a non-jury fast track for some vehicle
            cases. If your amount is more than $10,000, read that page and confirm
            where the case belongs. This site does not walk through that process.
          </p>
        </div>
      </section>

      <form className="stack section-gap" onSubmit={onSubmit} noValidate>
        <EstimateField error={error} />
        {amount !== null && amount > SMALL_CLAIMS_LIMIT ? (
          <p className="note" data-testid="amount-branch">
            The estimate you typed is {formatMoney(amount)}, which is more than
            $10,000. DC Courts describes Small Claims as $10,000 or less and Civil
            Actions as more than $10,000. Read the Civil Actions page before you
            use the small-claims forms.
          </p>
        ) : null}
        {amount !== null && amount <= SMALL_CLAIMS_LIMIT ? (
          <p className="note" data-testid="amount-branch">
            The estimate you typed is {formatMoney(amount)}. DC Courts describes
            Small Claims as $10,000 or less. A number inside that line does not
            mean the case will succeed, or that small claims is your only choice.
          </p>
        ) : null}

        <section>
          <h2>Official forms and pages</h2>
          <p>
            Use the court's own pages for current forms, fees, and hours. Fees and
            forms change. The court's eFiling page says people without a lawyer
            may file electronically, and that it is not required. The Small Claims
            page also lists filing in person, by mail, and by drop box.
          </p>
          <CourtLinkList />
        </section>

        <section>
          <h2>Suggested next step after the forms</h2>
          <p>
            If the case belongs in DC Small Claims, a practical sequence is:
          </p>
          <ol className="plain-list" data-testid="filing-steps">
            <li>File in DC Small Claims.</li>
            <li>
              Serve the insurer. The information sheet asks how the defendant will
              be served, and the Small Claims handbook explains service. This site
              does not tell you the correct way to serve your insurer.
            </li>
            <li>Bring the appraisal, the photos, and the body-shop invoice.</li>
          </ol>
        </section>

        <div className="actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate("/appraisal")}
          >
            Back
          </button>
          <button type="submit" className="button" data-testid="file-continue">
            See your next step
          </button>
        </div>
      </form>
    </article>
  )
}
