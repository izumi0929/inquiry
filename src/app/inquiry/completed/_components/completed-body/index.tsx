"use client"
import { useRouter } from "next/navigation"
import { FC, useCallback } from "react"

import { Button } from "@/app/_components/button"

import styles from "./index.module.css"

export const CompletedBody: FC = () => {
  const router = useRouter()
  const handleBack = useCallback(() => {
    router.push("/inquiry")
  }, [router])

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        <div>
          <h4>お問い合わせありがとうございます。</h4>
          <h4>内容を確認し、原則2営業日以内に担当の者よりご連絡いたします。</h4>
        </div>
        <div>
          <p>
            ご入力いただいたメールアドレス宛に受付確認メールをお送りしましたのでご確認ください。
          </p>
          <p>
            確認メールが届いていない場合には、メールアドレスが誤っているか、確認メールが迷惑メールフォルダ等に振り分けられている可能性がありますので、再度ご確認をお願いいたします。
          </p>
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button type="button" onClick={handleBack}>
          お問い合わせトップに戻る
        </Button>
      </div>
    </section>
  )
}
