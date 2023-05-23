import { CompletedBody } from "@/app/inquiry/completed/_components/completed-body"

import styles from "./page.module.css"

export default function InquiryCompleted() {
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>お問い合わせ完了</h1>
      </div>
      <div className={styles.bodyWrapper}>
        <CompletedBody />
      </div>
    </main>
  )
}
