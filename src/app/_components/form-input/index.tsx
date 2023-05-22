import { InputHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormInput = forwardRef<HTMLInputElement, Props>(({errorMessage, ...props}, ref) => (
  <>
    <input
      className={errorMessage ? styles.input_error : styles.input}
      {...props}
      ref={ref}
    />
    {errorMessage && (
      <p className={styles.errorMessage}>{errorMessage}</p>
    )}
  </>
))

FormInput.displayName = "FormInput"
