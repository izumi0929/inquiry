import { InputHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <>
    <input
      className={props.errorMessage ? styles.input_error : styles.input}
      {...props}
      ref={ref}
    />
    {props.errorMessage && (
      <p className={styles.errorMessage}>{props.errorMessage}</p>
    )}
  </>
))

FormInput.displayName = "FormInput"
