import { InputHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  label: string | JSX.Element
} & InputHTMLAttributes<HTMLInputElement>

export const FormCheckboxConfirm = forwardRef<HTMLInputElement, Props>(
  (props, ref) => (
    <div className={styles.inputWrapper}>
      <label className={styles.checkbox_confirm} htmlFor={props.name}>
        <input
          id={props.name}
          className={styles.input_confirm}
          {...props}
          ref={ref}
          type="checkbox"
          role="checkbox"
          readOnly
          checked
        />
        <span className={styles.checkbox_icon}>{props.label}</span>
      </label>
    </div>
  )
)

FormCheckboxConfirm.displayName = "FormInput"
