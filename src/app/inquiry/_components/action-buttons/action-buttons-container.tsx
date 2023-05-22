import { FC, PropsWithChildren } from "react"

import styles from "./index.module.css"

export const ActionButtonsContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.buttonsWrapper}>{children}</div>
}
