import { FC } from "react"

import { FormLabel } from "@/app/_components/form-label"
import { FormItem } from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItem
  value: string
}

export const FormConfirmField: FC<Props> = ({ formItem, value }) => {
  return (
    <div className={styles.wrapper}>
      <FormLabel required={formItem.required} withChip={false}>
        {formItem.label}
      </FormLabel>
      <p>{value}</p>
    </div>
  )
}
