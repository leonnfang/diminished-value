import { useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { DISCLAIMERS } from "../copy"
import { Progress } from "./Progress"

export function Layout() {
  const { dirty, reset } = useClaim()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  function startOver() {
    const ok = window.confirm("Clear the answers and files in this tab?")
    if (!ok) return
    reset()
    navigate("/")
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              Ar
            </span>
            <span className="brand-text">
              <span className="brand-name">After the Repair</span>
              <span className="brand-tag">A diminished-value guide</span>
            </span>
          </Link>
          <div className="header-actions">
            <p className="not-a-firm">Not a law firm</p>
            {dirty ? (
              <button type="button" className="text-button" onClick={startOver}>
                Start over
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <Progress />
      <main id="main">
        <Outlet />
      </main>
      <footer className="disclaimer-bar" aria-label="Disclaimers">
        {DISCLAIMERS.map((sentence) => (
          <p key={sentence}>{sentence}</p>
        ))}
      </footer>
    </div>
  )
}
