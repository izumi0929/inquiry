import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { Button } from "@/app/_components/button"
import { FormInput } from "@/app/_components/form-input"
import { FormLabel } from "@/app/_components/form-label"
import {
  FormItemPostalcode,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

import styles from "./index.module.css"

type Props = {
  formItem: FormItemPostalcode
  register: UseFormRegister<FormValues>
  handleSearch: () => void
  errorMessage?: string
}

export const FormPostalcodeField: FC<Props> = ({
  formItem,
  register,
  handleSearch,
  errorMessage
}) => {
  return (
    <div className={styles.wrapper}>
      <FormLabel htmlFor={formItem.name} required={formItem.required}>
        {formItem.label}
      </FormLabel>
      <div className={styles.inputWrapper}>
        <div>
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
        <Button
          variant="outlined"
          size="small"
          type="button"
          onClick={handleSearch}
        >
          検索
        </Button>
      </div>
    </div>
  )
}
