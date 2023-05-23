import { FC } from "react"
import { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form"

import { FormCheckbox } from "@/app/_components/form-checkbox"
import { FormInputField } from "@/app/inquiry/_components/form-input-field"
import { FormPostalcodeField } from "@/app/inquiry/_components/form-postalcode-field"
import { FormSelectField } from "@/app/inquiry/_components/form-select-field"
import { FormTextareaField } from "@/app/inquiry/_components/form-textarea-field"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

type Props = {
  formItem: FormItem
  errors: FieldErrors<FormValues>
  register: UseFormRegister<FormValues>
  getValues: UseFormGetValues<FormValues>
  searchAddress: (postalcode: string) => Promise<void>
}

export const InEditForm: FC<Props> = ({
  formItem,
  errors,
  register,
  getValues,
  searchAddress
}) => {
  switch (formItem.type) {
    case "textarea":
      return (
        <FormTextareaField
          formItem={formItem}
          register={register}
          errorMessage={errors[formItem.name]?.message}
        />
      )
    case "select":
      return (
        <FormSelectField
          formItem={formItem}
          register={register}
          errorMessage={errors[formItem.name]?.message}
        />
      )
    case "checkbox":
      return (
        <FormCheckbox
          {...register(formItem.name, { required: formItem.required })}
          label={formItem.label}
          errorMessage={errors[formItem.name]?.message}
        />
      )
    case "postalcode":
      return (
        <FormPostalcodeField
          formItem={formItem}
          register={register}
          errorMessage={errors[formItem.name]?.message}
          handleSearch={async () =>
            await searchAddress(getValues("postalcode"))
          }
        />
      )
    default:
      return (
        <FormInputField
          formItem={formItem}
          register={register}
          errorMessage={errors[formItem.name]?.message}
        />
      )
  }
}
