export type Jurisdiction = "" | "dc" | "other"
export type ClaimPath = "" | "settlement" | "file"
export type FileGroup = "accident" | "repaired" | "invoice"

export type LocalFile = {
  id: string
  name: string
  type: string
  size: number
  url: string
  previewable: boolean
}

export type TextDraft = {
  ownerName: string
  vehicle: string
  insurer: string
  claimNumber: string
  accidentDate: string
  accidentDescription: string
  appraiserCity: string
  jurisdiction: Jurisdiction
  otherPlace: string
  path: ClaimPath
  estimateAmount: string
}

export type FilesState = Record<FileGroup, LocalFile[]>

export type IntakeErrors = Partial<
  Record<
    | "ownerName"
    | "vehicle"
    | "insurer"
    | "accidentDescription"
    | "appraiserCity"
    | "accident"
    | "repaired"
    | "invoice",
    string
  >
>
