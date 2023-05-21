import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormInput } from "@/app/_components/form-input"
import { FormLabel } from "@/app/_components/form-label"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItem
  errorMessage?: string
  register: UseFormRegister<FormValues>
}

export const FormInputField: FC<Props> = ({
  formItem,
  register,
  errorMessage
}) => {
  return (
    <div>
      <FormLabel required={formItem.required}>{formItem.label}</FormLabel>
      <FormInput
        type={formItem.type}
        {...register(formItem.name, { required: formItem.required })}
        errorMessage={errorMessage}
      />
    </div>
  )
}
