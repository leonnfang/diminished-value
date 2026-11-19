import { useEffect, useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { EstimateField } from "../components/EstimateField"
import { buildSettlementEmail } from "../email"
import { usePageTitle } from "../use-page-title"

export function SettlementPage() {
  usePageTitle("Settlement email")
  const navigate = useNavigate()
  const { text, files, amount } = useClaim()
  const [attempted, setAttempted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState("")
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const draft = amount !== null ? buildSettlementEmail(text, amount) : null
  const error =
    attempted && amount === null
      ? "Enter an amount greater than zero, such as 1800. This site will not calculate one for you."
      : ""

  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (amount === null) {
      setAttempted(true)
      document.getElementById("estimate")?.focus()
      return
    }
    navigate("/appraisal")
  }

  async function copyEmail() {
    if (!draft) return
    const full = `Subject: ${draft.subject}\n\n${draft.body}`
    try {
      await navigator.clipboard.writeText(full)
      setCopyError("")
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
      setCopyError("Copy failed. Select the email below and copy it yourself.")
      bodyRef.current?.focus()
      bodyRef.current?.select()
    }
  }

  return (
    <article className="page">
      <p className="kicker">Settlement path</p>
      <h1>Draft a settlement email</h1>
      <p className="lede">
        This note uses what you entered. The dollar amount is yours. The site did
        not calculate a legally reliable number, and it does not send the email.
      </p>
      <form className="stack" onSubmit={onSubmit} noValidate>
        <EstimateField error={error} />
        <div className="email-sheet">
          <p className="email-subject">
            <span>Subject</span>
            {draft ? draft.subject : "Enter an estimate to finish the subject line."}
          </p>
          <label className="sr-only" htmlFor="email-body">
            Settlement email
          </label>
          <textarea
            id="email-body"
            ref={bodyRef}
            readOnly
            value={draft?.body ?? "The email appears here after you enter an estimate."}
            data-testid="settlement-email"
          />
        </div>
        <div className="actions actions-tight">
          <button
            type="button"
            className="button"
            data-testid="copy-email"
            onClick={() => void copyEmail()}
            disabled={!draft}
          >
            {copied ? "Copied" : "Copy email"}
          </button>
          <p className="hint" aria-live="polite">
            {copyError ||
              (copied
                ? "Copied. Paste it into your own email and attach the files yourself."
                : "Paste this into your own email. Attach the photos and invoice yourself.")}
          </p>
        </div>
        <div className="note">
          <p>Held in this tab, not attached to the email:</p>
          <ul>
            <li>Accident photos: {files.accident.length}</li>
            <li>After-repair photos: {files.repaired.length}</li>
            <li>Invoice files: {files.invoice.length}</li>
          </ul>
        </div>
        <div className="actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate("/path")}
          >
            Back
          </button>
          <button type="submit" className="button" data-testid="settlement-continue">
            Continue to appraisal
          </button>
        </div>
      </form>
    </article>
  )
}
