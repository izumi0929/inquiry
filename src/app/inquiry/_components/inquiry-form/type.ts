export type FormValues = {
  name: string
  furigana: string
  company: string
  email: string
  address: string
  postalcode: string
  tel: string
  productId: string
  title: string
  content: string
  agree: boolean
}

type FormType =
  | "text"
  | "textarea"
  | "email"
  | "checkbox"
  | "number"
  | "select"
  | "postalcode"

export type FormItemBase = {
  type: FormType
  label: string
  name: keyof FormValues
  required: boolean
}

export type FormItemText = FormItemBase & {
  type: "text"
  placeholder: string
}

export type FormItemTextarea = FormItemBase & {
  type: "textarea"
  placeholder: string
}

export type FormItemEmail = FormItemBase & {
  type: "email"
  placeholder: string
}

export type FormItemCheckbox = Omit<FormItemBase, "label"> & {
  type: "checkbox"
  label: string | JSX.Element
}

export type FormItemNumber = FormItemBase & {
  type: "number"
  placeholder: string
}

export type FormItemSelect = FormItemBase & {
  type: "select"
  options: readonly { label: string; value: string }[]
}

export type FormItemPostalcode = FormItemBase & {
  type: "postalcode"
  placeholder: string
}

export type FormItem =
  | FormItemText
  | FormItemTextarea
  | FormItemEmail
  | FormItemCheckbox
  | FormItemNumber
  | FormItemSelect
  | FormItemPostalcode
