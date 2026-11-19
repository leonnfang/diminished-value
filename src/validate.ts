import type { FilesState, IntakeErrors, TextDraft } from "./types"

export function intakeErrors(text: TextDraft, files: FilesState): IntakeErrors {
  const errors: IntakeErrors = {}
  if (text.ownerName.trim().length < 2) errors.ownerName = "Enter your name."
  if (text.vehicle.trim().length < 2) {
    errors.vehicle = "Enter the vehicle year, make, and model."
  }
  if (text.insurer.trim().length < 2) {
    errors.insurer = "Enter the insurance company you plan to contact."
  }
  if (text.accidentDescription.trim().length < 10) {
    errors.accidentDescription = "Describe the accident in a sentence or two."
  }
  if (text.appraiserCity.trim().length < 2) {
    errors.appraiserCity = "Enter a city for the appraiser search."
  }
  if (files.accident.length === 0) {
    errors.accident = "Add at least one photo from the accident."
  }
  if (files.repaired.length === 0) {
    errors.repaired = "Add at least one photo of the car after the repair."
  }
  if (files.invoice.length === 0) {
    errors.invoice = "Add the body-shop invoice (a photo or a PDF)."
  }
  return errors
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0
}
