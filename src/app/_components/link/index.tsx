import { forwardRef } from "react"

import styles from "./index.module.css"

type Props = {
  children: React.ReactNode
  isExternal?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = forwardRef<HTMLAnchorElement, Props>(({isExternal, ...props}, ref) => (
  <a
    className={styles.link}
    {...props}
    ref={ref}
    target={isExternal ? "_blank" : undefined}
    rel={isExternal ? "noopener noreferrer" : undefined}
  >
    {props.children}
  </a>
))

Link.displayName = "Link"
