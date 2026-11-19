import { useMemo, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useClaim } from "../claim-context"
import { FileGroup } from "../components/FileGroup"
import { todayIso } from "../format"
import { usePageTitle } from "../use-page-title"
import { hasErrors, intakeErrors } from "../validate"

export function IntakePage() {
  usePageTitle("Accident and documents")
  const navigate = useNavigate()
  const { text, files, update, addFiles, removeFile } = useClaim()
  const [submitted, setSubmitted] = useState(false)
  const errors = useMemo(
    () => (submitted ? intakeErrors(text, files) : {}),
    [submitted, text, files],
  )

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = intakeErrors(text, files)
    setSubmitted(true)
    if (hasErrors(next)) {
      window.setTimeout(() => {
        document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
      }, 0)
      return
    }
    navigate("/jurisdiction")
  }

  return (
    <article className="page">
      <p className="kicker">Step 1 · Intake</p>
      <h1>What happened, and what you have</h1>
      <p className="lede">
        Write down the accident and add the pictures and invoice you would want
        an insurer or a court to see. Nothing on this page is uploaded.
      </p>
      <p className="note">
        Typed answers stay in this browser tab until you close it. Photos and the
        invoice stay only until you refresh or close the tab. They are not sent
        anywhere.
      </p>
      <form
        className="stack"
        onSubmit={onSubmit}
        noValidate
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => event.preventDefault()}
      >
        <div className={errors.ownerName ? "field field-invalid" : "field"}>
          <label htmlFor="ownerName">Your name</label>
          <input
            id="ownerName"
            name="ownerName"
            autoComplete="name"
            maxLength={120}
            value={text.ownerName}
            aria-invalid={errors.ownerName ? true : undefined}
            aria-describedby={errors.ownerName ? "ownerName-error" : undefined}
            onChange={(event) => update({ ownerName: event.target.value })}
          />
          {errors.ownerName ? (
            <p className="error" id="ownerName-error" role="alert">
              {errors.ownerName}
            </p>
          ) : null}
        </div>

        <div className={errors.vehicle ? "field field-invalid" : "field"}>
          <label htmlFor="vehicle">Vehicle</label>
          <p className="hint" id="vehicle-hint">
            Year, make, and model. For example, 2019 Honda Accord.
          </p>
          <input
            id="vehicle"
            name="vehicle"
            maxLength={120}
            value={text.vehicle}
            aria-invalid={errors.vehicle ? true : undefined}
            aria-describedby={errors.vehicle ? "vehicle-hint vehicle-error" : "vehicle-hint"}
            onChange={(event) => update({ vehicle: event.target.value })}
          />
          {errors.vehicle ? (
            <p className="error" id="vehicle-error" role="alert">
              {errors.vehicle}
            </p>
          ) : null}
        </div>

        <div className="field-row">
          <div className={errors.insurer ? "field field-invalid" : "field"}>
            <label htmlFor="insurer">Insurance company</label>
            <p className="hint" id="insurer-hint">
              The company you plan to contact. This page does not notify them.
            </p>
            <input
              id="insurer"
              name="insurer"
              maxLength={160}
              value={text.insurer}
              aria-invalid={errors.insurer ? true : undefined}
              aria-describedby={errors.insurer ? "insurer-hint insurer-error" : "insurer-hint"}
              onChange={(event) => update({ insurer: event.target.value })}
            />
            {errors.insurer ? (
              <p className="error" id="insurer-error" role="alert">
                {errors.insurer}
              </p>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="claimNumber">Claim number</label>
            <p className="hint" id="claimNumber-hint">
              Optional. Include it if you already have one.
            </p>
            <input
              id="claimNumber"
              name="claimNumber"
              maxLength={80}
              value={text.claimNumber}
              aria-describedby="claimNumber-hint"
              onChange={(event) => update({ claimNumber: event.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="accidentDate">Date of the accident</label>
          <p className="hint" id="accidentDate-hint">
            Optional. It is added to the settlement email if you enter it.
          </p>
          <input
            id="accidentDate"
            name="accidentDate"
            type="date"
            max={todayIso()}
            value={text.accidentDate}
            aria-describedby="accidentDate-hint"
            onChange={(event) => update({ accidentDate: event.target.value })}
          />
        </div>

        <div className={errors.accidentDescription ? "field field-invalid" : "field"}>
          <label htmlFor="accidentDescription">What happened</label>
          <p className="hint" id="accidentDescription-hint">
            Where you were, how the cars made contact, and what was damaged. Plain
            words are enough.
          </p>
          <textarea
            id="accidentDescription"
            name="accidentDescription"
            rows={6}
            maxLength={5000}
            value={text.accidentDescription}
            aria-invalid={errors.accidentDescription ? true : undefined}
            aria-describedby={
              errors.accidentDescription
                ? "accidentDescription-hint accidentDescription-error"
                : "accidentDescription-hint"
            }
            onChange={(event) => update({ accidentDescription: event.target.value })}
          />
          {errors.accidentDescription ? (
            <p className="error" id="accidentDescription-error" role="alert">
              {errors.accidentDescription}
            </p>
          ) : null}
        </div>

        <div className={errors.appraiserCity ? "field field-invalid" : "field"}>
          <label htmlFor="appraiserCity">City for finding an appraiser</label>
          <p className="hint" id="appraiserCity-hint">
            Used only to build a Google Maps search near you. This can be
            different from where the accident happened. For example, Washington or
            Arlington.
          </p>
          <input
            id="appraiserCity"
            name="appraiserCity"
            maxLength={120}
            value={text.appraiserCity}
            aria-invalid={errors.appraiserCity ? true : undefined}
            aria-describedby={
              errors.appraiserCity
                ? "appraiserCity-hint appraiserCity-error"
                : "appraiserCity-hint"
            }
            onChange={(event) => update({ appraiserCity: event.target.value })}
          />
          {errors.appraiserCity ? (
            <p className="error" id="appraiserCity-error" role="alert">
              {errors.appraiserCity}
            </p>
          ) : null}
        </div>

        <FileGroup
          id="accident"
          label="Photos of the accident"
          hint="JPG, PNG, WEBP, GIF, or HEIC. Add more than one if you have them."
          accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif"
          files={files.accident}
          error={errors.accident}
          onAdd={(list) => addFiles("accident", list)}
          onRemove={(id) => removeFile("accident", id)}
        />
        <FileGroup
          id="repaired"
          label="Photos of the car after repair"
          hint="Pictures from after the body shop finished. These stay in this tab."
          accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif"
          files={files.repaired}
          error={errors.repaired}
          onAdd={(list) => addFiles("repaired", list)}
          onRemove={(id) => removeFile("repaired", id)}
        />
        <FileGroup
          id="invoice"
          label="Body-shop invoice"
          hint="A photo or a PDF of the repair bill."
          accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif,application/pdf,.pdf"
          files={files.invoice}
          error={errors.invoice}
          onAdd={(list) => addFiles("invoice", list)}
          onRemove={(id) => removeFile("invoice", id)}
        />

        <div className="actions">
          <button type="button" className="button button-secondary" onClick={() => navigate("/")}>
            Back
          </button>
          <button type="submit" className="button" data-testid="intake-continue">
            Continue
          </button>
        </div>
      </form>
    </article>
  )
}
