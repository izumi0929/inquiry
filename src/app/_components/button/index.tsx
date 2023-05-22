import { ButtonHTMLAttributes, forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  variant?: "filled" | "outlined"
  size?: "small" | "large"
  type?: "button" | "submit" | "reset"
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "filled", size = "large", ...props }, ref) => {
    const getStyle = () => {
      return `button_${variant}_${size}`
    }
    return (
      <button className={styles[getStyle()]} {...props} ref={ref}>
        {props.children}
      </button>
    )
  }
)

Button.displayName = "Button"
