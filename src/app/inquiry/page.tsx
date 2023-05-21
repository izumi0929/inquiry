import { InquiryForm } from "@/app/inquiry/_components/inquiry-form"

import styles from "./page.module.css"

export default function Inquiry() {
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>お問い合わせフォーム</h1>
      </div>
      <InquiryForm />
    </main>
  )
}
