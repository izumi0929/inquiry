import { SelectHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  errorMessage?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export const FormSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <>
    <select
      className={props.errorMessage ? styles.select_error : styles.select}
      {...props}
      ref={ref}
    >
      {props.children}
    </select>
    {props.errorMessage && (
      <p className={styles.errorMessage}>{props.errorMessage}</p>
    )}
  </>
))

FormSelect.displayName = "FormSelect"
