import { useClaim } from "../claim-context"
import { formatMoney } from "../format"

export function EstimateField({ error }: { error?: string }) {
  const { text, update, amount } = useClaim()
  const hintId = "estimate-hint"
  const errorId = "estimate-error"
  const previewId = "estimate-preview"

  return (
    <div className={error ? "field field-invalid" : "field"}>
      <label htmlFor="estimate">Your estimate</label>
      <p className="hint" id={hintId}>
        Type the dollar amount you want to use. This is a placeholder you enter.
        This website did not calculate it, and it is not a legally reliable number.
      </p>
      <input
        id="estimate"
        name="estimate"
        inputMode="decimal"
        autoComplete="off"
        maxLength={20}
        placeholder="1800"
        value={text.estimateAmount}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${hintId} ${errorId}` : `${hintId} ${previewId}`}
        onChange={(event) => update({ estimateAmount: event.target.value })}
        onBlur={() => {
          if (amount !== null) update({ estimateAmount: amount.toFixed(2) })
        }}
      />
      <p className="hint" id={previewId}>
        {amount !== null
          ? `${formatMoney(amount)} is the amount you typed. This website did not calculate it.`
          : "Example: 1800 or 1800.00. Do not include words."}
      </p>
      {error ? (
        <p className="error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
