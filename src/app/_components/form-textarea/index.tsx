import { TextareaHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  errorMessage?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => (
    <>
      <textarea
        className={props.errorMessage ? styles.textarea_error : styles.textarea}
        {...props}
        ref={ref}
      />
      {props.errorMessage && (
        <p className={styles.errorMessage}>{props.errorMessage}</p>
      )}
    </>
  )
)

FormTextarea.displayName = "FormTextarea"
