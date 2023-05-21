import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormLabel } from "@/app/_components/form-label"
import { FormTextarea } from "@/app/_components/form-textarea"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItem
  errorMessage?: string
  register: UseFormRegister<FormValues>
}

export const FormTextareaField: FC<Props> = ({
  formItem,
  register,
  errorMessage
}) => {
  return (
    <div>
      <FormLabel required={formItem.required}>{formItem.label}</FormLabel>
      <FormTextarea
        {...register(formItem.name, { required: formItem.required })}
        errorMessage={errorMessage}
      />
    </div>
  )
}
