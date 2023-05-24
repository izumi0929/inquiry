import { TextareaHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  errorMessage?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ errorMessage, ...props }, ref) => (
    <>
      <textarea
        className={errorMessage ? styles.textarea_error : styles.textarea}
        rows={props.rows || 6}
        {...props}
        ref={ref}
        id={props.id}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  )
)

FormTextarea.displayName = "FormTextarea"
