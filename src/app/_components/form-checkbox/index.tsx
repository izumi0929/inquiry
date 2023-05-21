import { InputHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  label: string | JSX.Element
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormCheckbox = forwardRef<HTMLInputElement, Props>(
  (props, ref) => (
    <>
      <div className={styles.inputWrapper}>
        <label className={styles.checkbox} htmlFor={props.name}>
          <input
            id={props.name}
            className={styles.input}
            {...props}
            ref={ref}
            type="checkbox"
          />
          <span
            className={
              props.errorMessage
                ? styles.checkbox_icon_error
                : styles.checkbox_icon
            }
          >
            {props.label}
          </span>
        </label>
      </div>
      {props.errorMessage && (
        <p className={styles.errorMessage}>{props.errorMessage}</p>
      )}
    </>
  )
)

FormCheckbox.displayName = "FormInput"
