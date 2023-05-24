import { InputHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  label: string | JSX.Element
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, errorMessage, ...props }, ref) => (
    <>
      <div className={styles.inputWrapper}>
        <label className={styles.checkbox} htmlFor={props.name}>
          <input
            id={props.name}
            className={styles.input}
            {...props}
            ref={ref}
            type="checkbox"
            role="checkbox"
          />
          <span
            className={
              errorMessage ? styles.checkbox_icon_error : styles.checkbox_icon
            }
          >
            {label}
          </span>
        </label>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  )
)

FormCheckbox.displayName = "FormInput"
