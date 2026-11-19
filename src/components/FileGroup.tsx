import { useRef, useState, type DragEvent } from "react"
import { formatBytes } from "../format"
import type { LocalFile } from "../types"

export function FileGroup({
  id,
  label,
  hint,
  accept,
  files,
  error,
  onAdd,
  onRemove,
}: {
  id: string
  label: string
  hint: string
  accept: string
  files: LocalFile[]
  error?: string
  onAdd: (list: FileList | File[]) => string | null
  onRemove: (id: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const message = error ?? localError
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  function take(list: FileList | File[]) {
    setLocalError(onAdd(list))
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    event.stopPropagation()
    setDrag(false)
    take(event.dataTransfer.files)
  }

  return (
    <section
      className={drag ? "file-group drop-active" : "file-group"}
      aria-labelledby={`${id}-label`}
      onDragOver={(event) => {
        event.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
    >
      <div className="file-heading">
        <h2 id={`${id}-label`}>{label}</h2>
        <p className="hint" id={hintId}>
          {hint}
        </p>
      </div>
      <button
        type="button"
        className="button button-secondary"
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${hintId} ${errorId}` : hintId}
        onClick={() => inputRef.current?.click()}
      >
        Add files
      </button>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept={accept}
        multiple
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          if (event.target.files) take(event.target.files)
          event.target.value = ""
        }}
      />
      {files.length > 0 ? (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.id}>
              {file.previewable ? (
                <img src={file.url} alt="" />
              ) : (
                <span className="file-fallback" aria-hidden="true">
                  {file.type === "application/pdf" || /\.pdf$/i.test(file.name)
                    ? "PDF"
                    : "File"}
                </span>
              )}
              <span className="file-meta">
                <span className="file-name">{file.name}</span>
                <span className="hint">
                  {formatBytes(file.size)}
                  {file.previewable ? "" : " · preview unavailable, kept in this tab"}
                </span>
              </span>
              <button
                type="button"
                className="text-button"
                onClick={() => onRemove(file.id)}
              >
                Remove <span className="sr-only">{file.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="hint file-empty">Nothing added yet. Files stay in this tab.</p>
      )}
      {message ? (
        <p className="error" id={errorId} role="alert">
          {message}
        </p>
      ) : null}
    </section>
  )
}
