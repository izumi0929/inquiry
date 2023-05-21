import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormInput } from "@/app/_components/form-input"
import { FormLabel } from "@/app/_components/form-label"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItem
  register: UseFormRegister<FormValues>
  errorMessage?: string
}

export const FormInputField: FC<Props> = ({
  formItem,
  register,
  errorMessage
}) => {
  return (
    <div className={styles.wrapper}>
      <FormLabel required={formItem.required}>{formItem.label}</FormLabel>
      <FormInput
        type={formItem.type}
        {...register(formItem.name, { required: formItem.required })}
        errorMessage={errorMessage}
      />
    </div>
  )
}
