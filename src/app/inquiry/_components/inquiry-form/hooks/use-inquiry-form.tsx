import { zodResolver } from "@hookform/resolvers/zod"
import { FormEvent, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { searchAddressByPostalcode } from "@/api/search-address"
import { FormCheckbox } from "@/app/_components/form-checkbox"
import { FormCheckboxConfirm } from "@/app/_components/form-checkbox/confirm"
import { InConfirmButtons } from "@/app/inquiry/_components/action-buttons/in-confirm-buttons"
import { InEditButtons } from "@/app/inquiry/_components/action-buttons/in-edit-buttons"
import { FormConfirmField } from "@/app/inquiry/_components/form-confirm-field"
import { FormInputField } from "@/app/inquiry/_components/form-input-field"
import { FormPostalcodeField } from "@/app/inquiry/_components/form-postalcode-field"
import { FormSelectField } from "@/app/inquiry/_components/form-select-field"
import { FormTextareaField } from "@/app/inquiry/_components/form-textarea-field"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

// 実際にはバックエンドの仕様に合わせる
const inquiryFormSchemea = z.object({
  name: z.string().min(1, { message: "必須項目です" }).max(100),
  furigana: z.string().min(1, { message: "必須項目です" }).max(100),
  company: z.string().max(100, { message: "100文字以内で入力してください" }),
  email: z.string().email("メールアドレスの形式で入力してください"),
  postalcode: z.string().max(20, { message: "20文字以内で入力してください" }),
  address: z.string().max(100, { message: "100文字以内で入力してください" }),
  tel: z.string().max(20, { message: "20文字以内で入力してください" }),
  productId: z.string(),
  title: z
    .string()
    .min(1, { message: "必須項目です" })
    .max(100, { message: "100文字以内で入力してください" }),
  content: z
    .string()
    .min(1, { message: "必須項目です" })
    .max(1000, { message: "1000文字以内で入力してください" }),
  agree: z.boolean().refine((v) => v === true, { message: "同意が必要です" })
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
  content: "",
  agree: false
} as const satisfies Zod.infer<typeof inquiryFormSchemea>

export const useInquiryForm = () => {
  const [confirmMode, setConfirmMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleConfirmMode = useCallback(() => {
    setConfirmMode((prev) => !prev)
  }, [])

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(inquiryFormSchemea)
  })

  const searchAddress = useCallback(
    async (postalcode: string) => {
      clearErrors("postalcode")
      try {
        const res = await searchAddressByPostalcode(postalcode)
        setValue("address", `${res.address1}${res.address2}${res.address3}`)
      } catch (err: any) {
        setError("postalcode", {
          type: "manual",
          message: err.message
        })
      }
    },
    [setValue, setError, clearErrors]
  )

  const renderFormItemConfirm = useCallback(
    (formItem: FormItem) => {
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
              value={
                formItem.options.find(
                  (option) => option.value === getValues(formItem.name)
                )?.label || ""
              }
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
    },
    [getValues]
  )

  const renderFormItemEdit = useCallback(
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
    },
    [errors, register, getValues, searchAddress]
  )

  const renderFormItem = useCallback(
    (formItem: FormItem) => {
      return confirmMode
        ? renderFormItemConfirm(formItem)
        : renderFormItemEdit(formItem)
    },
    [confirmMode, renderFormItemConfirm, renderFormItemEdit]
  )

  const renderButtons = useCallback(() => {
    return confirmMode ? (
      <InConfirmButtons onClickBack={toggleConfirmMode} loading={loading} />
    ) : (
      <InEditButtons onClickConfirm={handleSubmit(toggleConfirmMode)} />
    )
  }, [confirmMode, loading, toggleConfirmMode, handleSubmit])

  const handleComplete = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (loading) return
      setLoading(true)
      const form = e.target as HTMLFormElement
      // eslint-disable-next-line no-console
      console.log("送信データ", getValues())
      form.submit()
    },
    [getValues, loading]
  )

  return {
    renderFormItem,
    renderButtons,
    handleComplete
  }
}
