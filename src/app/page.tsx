import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>お問い合わせフォーム</h1>
      </div>
    </main>
  )
}
