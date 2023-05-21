import { forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
}

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button className={styles.input} {...props} ref={ref}>
    {props.children}
  </button>
))

Button.displayName = "Button"
