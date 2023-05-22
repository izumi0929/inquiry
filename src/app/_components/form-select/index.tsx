import { SelectHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  options: readonly { value: string; label: string }[]
  errorMessage?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export const FormSelect = forwardRef<HTMLSelectElement, Props>(
  ({ options, errorMessage, ...props }, ref) => (
    <div className={styles.selectWrapper}>
      <select
        className={errorMessage ? styles.select_error : styles.select}
        {...props}
        ref={ref}
        defaultValue={''}
      >
        <option value="">-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  )
)

FormSelect.displayName = "FormSelect"
