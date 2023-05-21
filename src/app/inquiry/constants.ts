import { FormItem } from "@/app/inquiry/_components/inquiry-form/type"

export const formItems = [
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
    type: "number",
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
  }
] as const satisfies readonly FormItem[]
