import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FormCheckbox } from "@/app/_components/form-checkbox"
import { FormInputField } from "@/app/inquiry/_components/form-input-field"
import { FormSelectField } from "@/app/inquiry/_components/form-select-field"
import { FormTextareaField } from "@/app/inquiry/_components/form-textarea-field"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

const inquiryFormSchemea = z.object({
  name: z.string().min(1, { message: "required" }).max(100),
  furigana: z.string().min(1, { message: "required" }).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  postalcode: z.string().max(20),
  address: z.string().max(1000),
  tel: z.string().max(20),
  productId: z.string().max(100),
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000)
})

const formDefaultValues = {
  name: "",
  furigana: "",
  company: "",
  email: "",
  postalcode: "",
  address: "",
  tel: "",
  productId: "",
  title: "",
  content: ""
} as const satisfies Zod.infer<typeof inquiryFormSchemea>

export const useInquiryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(inquiryFormSchemea)
  })

  const renderFormItem = useCallback(
    (formItem: FormItem) => {
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
        // text, email, tel
        default:
          return (
            <FormInputField
              formItem={formItem}
              register={register}
              errorMessage={errors[formItem.name]?.message}
            />
          )
      }
    },
    [errors, register]
  )
  return { renderFormItem, handleSubmit }
}
