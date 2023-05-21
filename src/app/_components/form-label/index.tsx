import { forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  required: boolean
}

export const FormLabel = forwardRef<HTMLLabelElement, Props>((props, ref) => (
  <div className={styles.labelWrapper}>
    <label className={styles.label} {...props} ref={ref}>
      {props.children}
    </label>
    {props.required && <span className={styles.label_required}>必須</span>}
  </div>
))

FormLabel.displayName = "FormLabel"
