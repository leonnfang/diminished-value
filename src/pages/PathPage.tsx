import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { usePageTitle } from "../use-page-title"

export function PathPage() {
  usePageTitle("Choose a path")
  const navigate = useNavigate()
  const { text, update } = useClaim()

  return (
    <article className="page page-wide">
      <p className="kicker">Step 3 · Path</p>
      <h1>Two ways to proceed in DC</h1>
      <p className="lede">
        As a general matter, District of Columbia law lets a vehicle owner seek
        the loss in market value that can remain after a repair. People call that
        diminished value. Whether it fits your accident, and for how much money,
        is not something this website can decide.
      </p>
      <p>
        Many people ask the insurance company to settle before they file anything.
        You can also go straight to a court claim. Either path is available here,
        and you can switch later.
      </p>
      <div className="path-grid">
        <section className={text.path === "settlement" ? "path-card path-card-selected" : "path-card"}>
          <p className="kicker">Path A</p>
          <h2>Ask the insurer to settle</h2>
          <p>
            Draft an email from the details you entered and a dollar amount you
            type in. You copy it and send it yourself. This is a request to the
            insurance company, not a lawsuit.
          </p>
          <button
            type="button"
            className="button"
            data-testid="choose-settlement"
            onClick={() => {
              update({ path: "settlement" })
              navigate("/settlement")
            }}
          >
            Draft a settlement email
          </button>
        </section>
        <section className={text.path === "file" ? "path-card path-card-selected" : "path-card"}>
          <p className="kicker">Path B</p>
          <h2>File a claim</h2>
          <p>
            See the difference between DC small claims and a regular civil claim,
            with links to the court's own forms. This site does not file anything
            for you.
          </p>
          <button
            type="button"
            className="button button-secondary"
            data-testid="choose-file"
            onClick={() => {
              update({ path: "file" })
              navigate("/appraisal")
            }}
          >
            See how filing works
          </button>
        </section>
      </div>
      <div className="actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate("/jurisdiction")}
        >
          Back
        </button>
      </div>
    </article>
  )
}
