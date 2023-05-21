import { forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  required: boolean
  withChip?: boolean
}

export const FormLabel = forwardRef<HTMLLabelElement, Props>(
  ({ withChip = true, ...props }, ref) => {
    const renderLabel = () => {
      return (
        <label className={styles.label} {...props} ref={ref}>
          {props.children}
        </label>
      )
    }

    if (!withChip) {
      return <div className={styles.labelWrapper}>{renderLabel()}</div>
    }

    return (
      <div className={styles.labelWrapper}>
        {renderLabel()}
        {props.required ? (
          <span className={styles.labelChip_required}>必須</span>
        ) : (
          <span className={styles.labelChip_optional}>任意</span>
        )}
      </div>
    )
  }
)

FormLabel.displayName = "FormLabel"
