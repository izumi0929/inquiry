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
    {props.required ? (
      <span className={styles.labelChip_required}>必須</span>
    ) : (
      <span className={styles.labelChip_optional}>任意</span>
    )}
  </div>
))

FormLabel.displayName = "FormLabel"
