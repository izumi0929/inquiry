import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormInput } from "@/app/_components/form-input"
import { FormLabel } from "@/app/_components/form-label"
import {
  FormItemEmail,
  FormItemTel,
  FormItemText,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItemText | FormItemEmail | FormItemTel
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
      <FormLabel htmlFor={formItem.name} required={formItem.required}>
        {formItem.label}
      </FormLabel>
      <FormInput
        type={formItem.type}
        {...register(formItem.name, { required: formItem.required })}
        errorMessage={errorMessage}
        placeholder={formItem.placeholder}
        autoComplete={formItem.autocomplete}
        autoFocus={formItem.autofocus}
        id={formItem.name}
      />
    </div>
  )
}
