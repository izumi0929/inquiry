import { FC } from "react"

import { FormLabel } from "@/app/_components/form-label"
import { FormItem } from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItem
  value: string
}

export const FormConfirmField: FC<Props> = ({ formItem, value }) => {
  return (
    <div>
      <FormLabel required={formItem.required} withChip={false}>
        {formItem.label}
      </FormLabel>
      <p>{value}</p>
    </div>
  )
}
