import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { FormLabel } from "@/app/_components/form-label"
import { FormTextarea } from "@/app/_components/form-textarea"
import {
  FormItemTextarea,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItemTextarea
  register: UseFormRegister<FormValues>
  errorMessage?: string
}

export const FormTextareaField: FC<Props> = ({
  formItem,
  register,
  errorMessage
}) => {
  return (
    <div className={styles.wrapper}>
      <FormLabel htmlFor={formItem.name} required={formItem.required}>
        {formItem.label}
      </FormLabel>
      <FormTextarea
        {...register(formItem.name, { required: formItem.required })}
        placeholder={formItem.placeholder}
        autoComplete={formItem.autocomplete}
        errorMessage={errorMessage}
        required={formItem.required}
        id={formItem.name}
      />
    </div>
  )
}
