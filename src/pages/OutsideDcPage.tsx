import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { usePageTitle } from "../use-page-title"

export function OutsideDcPage() {
  usePageTitle("Outside Washington, DC")
  const navigate = useNavigate()
  const { text, reset } = useClaim()
  const place = text.otherPlace.trim() || "somewhere else"

  return (
    <article className="page">
      <p className="kicker">This version stops here</p>
      <h1>Diminished-value rules vary by place</h1>
      <p className="lede">
        This version covers Washington, DC. It does not state the rule for {place}.
        Confirm that with an attorney before you rely on a claim from somewhere
        else.
      </p>
      <p>
        There is no state-by-state guide on this site, and it will not guess how
        another place treats diminished value.
      </p>
      <div className="actions">
        <button
          type="button"
          className="button"
          onClick={() => navigate("/jurisdiction")}
        >
          Change where it happened
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            reset()
            navigate("/")
          }}
        >
          Start over
        </button>
      </div>
    </article>
  )
}
