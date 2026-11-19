export const DISCLAIMERS = [
  "This website does not replace an attorney or guarantee an outcome.",
  "This website does not provide legal advice.",
  "Consult an attorney if you have additional questions about your claim or want to confirm the output provided here.",
] as const

/** Mirrors the dollar line DC Courts publishes for Small Claims ($10,000 or less) and Civil Actions (more than $10,000). */
export const SMALL_CLAIMS_LIMIT = 10_000

export const COURT_LINKS = [
  {
    label: "Small Claims branch",
    href: "https://www.dccourts.gov/superior-court/superior-court-divisions/civil-division/small-claims",
    detail: "Overview of small claims, how a case starts, and how to file.",
  },
  {
    label: "Statement of Claim (form page)",
    href: "https://www.dccourts.gov/court-resources/search-forms/statement-of-claim-small-claims",
    detail: "Official page for the form that starts a small-claims case.",
  },
  {
    label: "Statement of Claim (PDF)",
    href: "https://www.dccourts.gov/sites/default/files/2023-11/Statement_of_Claim_Small_Claims_0.pdf",
    detail: "English PDF offered on that form page.",
  },
  {
    label: "Small Claims Information Sheet (form page)",
    href: "https://www.dccourts.gov/court-resources/search-forms/small-claims-information-sheet",
    detail: "Official page for the information sheet filed with the statement of claim.",
  },
  {
    label: "Small Claims Information Sheet (PDF)",
    href: "https://www.dccourts.gov/sites/default/files/2018-10/SmallClaimsInformationSheet.pdf",
    detail: "English PDF offered on that form page.",
  },
  {
    label: "All Small Claims forms",
    href: "https://www.dccourts.gov/court-resources/search-forms?location=smallclaims",
    detail: "DC Courts form search, filtered to Small Claims.",
  },
  {
    label: "Small Claims handbook (PDF)",
    href: "https://www.dccourts.gov/sites/default/files/2026-08/2026-Small-Claims-Handbook-Final.pdf",
    detail: "The court's handbook for Small Claims.",
  },
  {
    label: "File online (eFiling)",
    href: "https://www.dccourts.gov/superior-court/file-online-efiling",
    detail: "Electronic filing for Superior Court.",
  },
  {
    label: "Civil Actions branch",
    href: "https://www.dccourts.gov/superior-court/superior-court-divisions/civil-division/civil-actions",
    detail: "Regular civil cases. The court describes this branch as claims for more than $10,000.",
  },
] as const
