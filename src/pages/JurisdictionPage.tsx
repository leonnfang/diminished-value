import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { usePageTitle } from "../use-page-title"

export function JurisdictionPage() {
  usePageTitle("Where it happened")
  const navigate = useNavigate()
  const { text, update } = useClaim()
  const [error, setError] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!text.jurisdiction) {
      setError("Choose where the accident happened.")
      return
    }
    navigate(text.jurisdiction === "dc" ? "/path" : "/outside-dc")
  }

  return (
    <article className="page">
      <p className="kicker">Step 2 · Place</p>
      <h1>Where did the accident happen?</h1>
      <p className="lede">
        This is the place of the accident, not necessarily where you live. This
        version continues only for Washington, DC.
      </p>
      <form className="stack" onSubmit={onSubmit} noValidate>
        <fieldset className="choice-set">
          <legend className="sr-only">Accident location</legend>
          <label className={text.jurisdiction === "dc" ? "choice choice-checked" : "choice"}>
            <input
              type="radio"
              name="jurisdiction"
              value="dc"
              checked={text.jurisdiction === "dc"}
              onChange={() => {
                update({ jurisdiction: "dc" })
                setError("")
              }}
            />
            <span>
              <span className="choice-title">Washington, DC</span>
              <span className="choice-body">
                Continue. The next steps are written for the District of Columbia.
              </span>
            </span>
          </label>
          <label className={text.jurisdiction === "other" ? "choice choice-checked" : "choice"}>
            <input
              type="radio"
              name="jurisdiction"
              value="other"
              checked={text.jurisdiction === "other"}
              onChange={() => {
                update({ jurisdiction: "other" })
                setError("")
              }}
            />
            <span>
              <span className="choice-title">Somewhere else</span>
              <span className="choice-body">
                Rules vary by place. This version does not cover other locations.
              </span>
            </span>
          </label>
        </fieldset>
        {text.jurisdiction === "other" ? (
          <div className="field">
            <label htmlFor="otherPlace">Where did it happen?</label>
            <p className="hint" id="otherPlace-hint">
              Optional. It is only used to repeat the place back to you. This site
              will not look up that place's rules.
            </p>
            <input
              id="otherPlace"
              name="otherPlace"
              maxLength={160}
              value={text.otherPlace}
              aria-describedby="otherPlace-hint"
              onChange={(event) => update({ otherPlace: event.target.value })}
            />
          </div>
        ) : null}
        {error ? (
          <p className="error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate("/intake")}
          >
            Back
          </button>
          <button type="submit" className="button" data-testid="jurisdiction-continue">
            Continue
          </button>
        </div>
      </form>
    </article>
  )
}
