"use client"
import { FC } from "react"

import { Button } from "@/app/_components/button"
import { Link } from "@/app/_components/link"
import { useInquiryForm } from "@/app/inquiry/_components/inquiry-form/hooks/use-inquiry-form"
import { FormItem } from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

const formItems = [
  {
    type: "text",
    label: "名前(姓名)",
    name: "name",
    required: true,
    placeholder: "山田太郎"
  },
  {
    type: "text",
    label: "ふりがな(姓名)",
    name: "furigana",
    required: true,
    placeholder: "やまだたろう"
  },
  {
    type: "text",
    label: "社名",
    name: "company",
    required: false,
    placeholder: "○○株式会社"
  },
  {
    type: "email",
    label: "メールアドレス",
    name: "email",
    required: true,
    placeholder: "taro.mountain@gmail.com"
  },
  {
    type: "postalcode",
    label: "郵便番号",
    name: "postalcode",
    required: false,
    placeholder: "1234567"
  },
  {
    type: "text",
    label: "住所",
    name: "address",
    required: false,
    placeholder: "福岡市博多区博多駅前3-23-20博多AGビル6F"
  },
  {
    type: "tel",
    label: "電話番号",
    name: "tel",
    required: false,
    placeholder: "0801234567"
  },
  {
    type: "select",
    label: "どの製品について",
    name: "productId",
    options: [
      { value: "1", label: "Aサービスについて" },
      { value: "2", label: "Bサービスについて" },
      { value: "3", label: "Cサービスについて" },
      { value: "4", label: "その他" }
    ],
    required: false
  },
  {
    type: "text",
    label: "問い合わせ件名",
    name: "title",
    required: true,
    placeholder: "○○の不具合について"
  },
  {
    type: "textarea",
    label: "問い合わせ内容",
    name: "content",
    required: true,
    placeholder: "○○の△△が開きません"
  },
  {
    type: "checkbox",
    label: (
      <p>
        <Link href="https://corporate.yamap.co.jp/privacy" isExternal={true}>
          個人情報の取り扱い
        </Link>
        について同意します
      </p>
    ),
    name: "agree",
    required: true
  }
] as const satisfies readonly FormItem[]

export const InquiryForm: FC = () => {
  const { renderFormItem, handleSubmit } = useInquiryForm()

  return (
    <form
      className={styles.form}
      action="/"
      // eslint-disable-next-line no-console
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      {formItems.map((item) => (
        <div key={item.name}>{renderFormItem(item)}</div>
      ))}
      <div className={styles.submitButtonWrapper}>
        <Button>内容を確認</Button>
      </div>
    </form>
  )
}
