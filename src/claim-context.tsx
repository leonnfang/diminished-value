import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { parseAmount } from "./format"
import type {
  ClaimPath,
  FileGroup,
  FilesState,
  Jurisdiction,
  LocalFile,
  TextDraft,
} from "./types"
import { intakeErrors, hasErrors } from "./validate"

const STORAGE_KEY = "after-the-repair-draft"
const MAX_FILES = 8
const MAX_BYTES = 15 * 1024 * 1024
const PHOTO_EXT = /\.(jpe?g|png|gif|webp|heic|heif)$/i
const INVOICE_EXT = /\.(jpe?g|png|gif|webp|heic|heif|pdf)$/i

const EMPTY_TEXT: TextDraft = {
  ownerName: "",
  vehicle: "",
  insurer: "",
  claimNumber: "",
  accidentDate: "",
  accidentDescription: "",
  appraiserCity: "",
  jurisdiction: "",
  otherPlace: "",
  path: "",
  estimateAmount: "",
}

function emptyFiles(): FilesState {
  return { accident: [], repaired: [], invoice: [] }
}

function readString(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : ""
}

function isJurisdiction(value: unknown): value is Jurisdiction {
  return value === "" || value === "dc" || value === "other"
}

function isPath(value: unknown): value is ClaimPath {
  return value === "" || value === "settlement" || value === "file"
}

function loadText(): TextDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY_TEXT }
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return { ...EMPTY_TEXT }
    const data = parsed as Record<string, unknown>
    return {
      ownerName: readString(data.ownerName, 120),
      vehicle: readString(data.vehicle, 120),
      insurer: readString(data.insurer, 160),
      claimNumber: readString(data.claimNumber, 80),
      accidentDate: readString(data.accidentDate, 10),
      accidentDescription: readString(data.accidentDescription, 5000),
      appraiserCity: readString(data.appraiserCity, 120),
      jurisdiction: isJurisdiction(data.jurisdiction) ? data.jurisdiction : "",
      otherPlace: readString(data.otherPlace, 160),
      path: isPath(data.path) ? data.path : "",
      estimateAmount: readString(data.estimateAmount, 20),
    }
  } catch {
    return { ...EMPTY_TEXT }
  }
}

function isHeic(file: File): boolean {
  return (
    /\.hei[cf]$/i.test(file.name) ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  )
}

function isAllowed(group: FileGroup, file: File): boolean {
  const nameOk = (group === "invoice" ? INVOICE_EXT : PHOTO_EXT).test(file.name)
  if (!nameOk) return false
  if (!file.type) return true
  if (file.type === "application/pdf") return group === "invoice"
  if (file.type.startsWith("image/") && file.type !== "image/svg+xml") return true
  return false
}

type ClaimContextValue = {
  text: TextDraft
  files: FilesState
  update: (partial: Partial<TextDraft>) => void
  addFiles: (group: FileGroup, list: FileList | File[]) => string | null
  removeFile: (group: FileGroup, id: string) => void
  reset: () => void
  intakeComplete: boolean
  amount: number | null
  hasEstimate: boolean
  dirty: boolean
}

const ClaimContext = createContext<ClaimContextValue | null>(null)

export function ClaimProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState<TextDraft>(loadText)
  const [files, setFiles] = useState<FilesState>(emptyFiles)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(text))
    } catch {
      // The form still works for this visit if storage is blocked.
    }
  }, [text])

  const update = useCallback((partial: Partial<TextDraft>) => {
    setText((prev) => ({ ...prev, ...partial }))
  }, [])

  const addFiles = useCallback(
    (group: FileGroup, list: FileList | File[]): string | null => {
      const incoming = Array.from(list)
      if (incoming.length === 0) return null
      const room = MAX_FILES - files[group].length
      if (room <= 0) return `You can keep up to ${MAX_FILES} files in this group.`

      const messages: string[] = []
      const accepted: LocalFile[] = []
      for (const file of incoming) {
        if (accepted.length >= room) {
          messages.push(`Only ${MAX_FILES} files can be kept in this group.`)
          break
        }
        if (file.size <= 0) {
          messages.push(`${file.name} is empty.`)
          continue
        }
        if (file.size > MAX_BYTES) {
          messages.push(`${file.name} is larger than 15 MB.`)
          continue
        }
        if (!isAllowed(group, file)) {
          messages.push(
            group === "invoice"
              ? `${file.name} needs to be a JPG, PNG, WEBP, GIF, HEIC, or PDF.`
              : `${file.name} needs to be a JPG, PNG, WEBP, GIF, or HEIC photo.`,
          )
          continue
        }
        accepted.push({
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          url: URL.createObjectURL(file),
          previewable: file.type.startsWith("image/") && !isHeic(file),
        })
      }

      if (accepted.length > 0) {
        setFiles((prev) => ({ ...prev, [group]: [...prev[group], ...accepted] }))
      }
      return messages[0] ?? null
    },
    [files],
  )

  const removeFile = useCallback((group: FileGroup, id: string) => {
    setFiles((prev) => {
      const target = prev[group].find((file) => file.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return { ...prev, [group]: prev[group].filter((file) => file.id !== id) }
    })
  }, [])

  const reset = useCallback(() => {
    setFiles((prev) => {
      for (const group of Object.values(prev)) {
        for (const file of group) URL.revokeObjectURL(file.url)
      }
      return emptyFiles()
    })
    setText({ ...EMPTY_TEXT })
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage failures.
    }
  }, [])

  const amount = parseAmount(text.estimateAmount)
  const intakeComplete = !hasErrors(intakeErrors(text, files))
  const dirty =
    text.ownerName !== "" ||
    text.vehicle !== "" ||
    text.insurer !== "" ||
    text.claimNumber !== "" ||
    text.accidentDate !== "" ||
    text.accidentDescription !== "" ||
    text.appraiserCity !== "" ||
    text.jurisdiction !== "" ||
    text.otherPlace !== "" ||
    text.path !== "" ||
    text.estimateAmount !== "" ||
    files.accident.length > 0 ||
    files.repaired.length > 0 ||
    files.invoice.length > 0

  const value = useMemo<ClaimContextValue>(
    () => ({
      text,
      files,
      update,
      addFiles,
      removeFile,
      reset,
      intakeComplete,
      amount,
      hasEstimate: amount !== null,
      dirty,
    }),
    [
      text,
      files,
      update,
      addFiles,
      removeFile,
      reset,
      intakeComplete,
      amount,
      dirty,
    ],
  )

  return <ClaimContext.Provider value={value}>{children}</ClaimContext.Provider>
}

export function useClaim(): ClaimContextValue {
  const value = useContext(ClaimContext)
  if (!value) throw new Error("useClaim must be used within ClaimProvider")
  return value
}
