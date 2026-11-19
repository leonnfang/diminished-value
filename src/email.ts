import { formatDate, formatMoney } from "./format"
import type { TextDraft } from "./types"

export function buildSettlementEmail(
  text: TextDraft,
  amount: number,
): { subject: string; body: string } {
  const vehicle = text.vehicle.trim()
  const owner = text.ownerName.trim()
  const claimNumber = text.claimNumber.trim()
  const subject = claimNumber
    ? `Diminished value after repair — ${vehicle} — claim ${claimNumber}`
    : `Diminished value after repair — ${vehicle}`

  const date = formatDate(text.accidentDate)
  const lines = [
    "Hello,",
    "",
    `My name is ${owner}. I am writing about diminished value on my ${vehicle} after it was repaired.`,
    "",
    `Insurance company: ${text.insurer.trim()}`,
  ]

  if (claimNumber) lines.push(`Claim number: ${claimNumber}`)

  lines.push(
    "",
    date
      ? `The accident was in Washington, DC, on ${date}.`
      : "The accident was in Washington, DC.",
    "",
    "What happened:",
    text.accidentDescription.trim(),
    "",
    "The car has been repaired. I have photos from the accident, photos from after the repair, and the body-shop invoice.",
    "",
    `I would like to settle the remaining loss in market value for ${formatMoney(amount)}. This figure is my own estimate. It is not an appraisal.`,
    "",
    "An independent appraisal is the usual way to support a number like this. I can send one if I have it.",
    "",
    "Please tell me how you would like to receive the photos, the invoice, and any appraisal.",
    "",
    "Thank you,",
    owner,
  )

  return { subject, body: lines.join("\n") }
}
