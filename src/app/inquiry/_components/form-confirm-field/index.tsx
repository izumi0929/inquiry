import { FC } from "react"

import { FormLabel } from "@/app/_components/form-label"
import { FormItem } from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItem
  value: string
  displayValue?: string
}

export const FormConfirmField: FC<Props> = ({
  formItem,
  value,
  displayValue
}) => {
  return (
    <div className={styles.wrapper}>
      <FormLabel
        htmlFor={formItem.name}
        required={formItem.required}
        withChip={false}
      >
        {formItem.label}
      </FormLabel>
      <p>{displayValue || value || "-"}</p>
      <input
        hidden
        name={formItem.name}
        id={formItem.name}
        defaultValue={value}
      />
    </div>
  )
}
