import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormLabel } from "@/app/_components/form-label"
import { FormSelect } from "@/app/_components/form-select"
import {
  FormItemSelect,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItemSelect
  errorMessage?: string
  register: UseFormRegister<FormValues>
}

export const FormSelectField: FC<Props> = ({
  formItem,
  register,
  errorMessage
}) => {
  return (
    <div>
      <FormLabel required>{formItem.label}</FormLabel>
      <FormSelect
        {...register(formItem.name, { required: formItem.required })}
        errorMessage={errorMessage}
      >
        {formItem.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
    </div>
  )
}
