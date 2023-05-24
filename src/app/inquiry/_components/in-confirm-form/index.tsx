import { FC } from "react"
import { UseFormGetValues } from "react-hook-form"

import { FormCheckboxConfirm } from "@/app/_components/form-checkbox/confirm"
import { FormConfirmField } from "@/app/inquiry/_components/form-confirm-field"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItem
  getValues: UseFormGetValues<FormValues>
}

export const InConfirmForm: FC<Props> = ({ formItem, getValues }) => {
  switch (formItem.type) {
    case "checkbox":
      return (
        <FormCheckboxConfirm
          name={formItem.name}
          label={formItem.label}
          value={getValues(formItem.name) ? "1" : ""}
        />
      )
    case "select":
      return (
        <FormConfirmField
          formItem={formItem}
          displayValue={
            formItem.options.find(
              (option) => option.value === getValues(formItem.name)
            )?.label || ""
          }
          value={getValues(formItem.name) as string}
        />
      )
    default:
      return (
        <FormConfirmField
          formItem={formItem}
          value={getValues(formItem.name) as string}
        />
      )
  }
}
