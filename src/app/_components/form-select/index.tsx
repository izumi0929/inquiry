import { SelectHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  options: readonly { value: string; label: string }[]
  errorMessage?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export const FormSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <div className={styles.selectWrapper}>
    <select
      className={props.errorMessage ? styles.select_error : styles.select}
      {...props}
      ref={ref}
    >
      <option selected value="">
        -
      </option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {props.errorMessage && (
      <p className={styles.errorMessage}>{props.errorMessage}</p>
    )}
  </div>
))

FormSelect.displayName = "FormSelect"
