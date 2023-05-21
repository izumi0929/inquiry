import { ButtonHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button className={styles.button} {...props} ref={ref}>
    {props.children}
  </button>
))

Button.displayName = "Button"
