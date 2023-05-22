import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { searchAddressByPostalcode } from "@/api/search-address"
import { Button } from "@/app/_components/button"
import { FormCheckbox } from "@/app/_components/form-checkbox"
import { FormCheckboxConfirm } from "@/app/_components/form-checkbox/confirm"
import { FormConfirmField } from "@/app/inquiry/_components/form-confirm-field"
import { FormInputField } from "@/app/inquiry/_components/form-input-field"
import { FormPostalcodeField } from "@/app/inquiry/_components/form-postalcode-field"
import { FormSelectField } from "@/app/inquiry/_components/form-select-field"
import { FormTextareaField } from "@/app/inquiry/_components/form-textarea-field"
import {
  FormItem,
  FormValues
} from "@/app/inquiry/_components/inquiry-form/type"

const inquiryFormSchemea = z.object({
  name: z.string().min(1, { message: "required" }).max(100),
  furigana: z.string().min(1, { message: "required" }).max(100),
  company: z.string().max(100),
  email: z.string().email(),
  postalcode: z.string().max(20),
  address: z.string().max(1000),
  tel: z.string().max(20),
  productId: z.string().max(100),
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  agree: z.boolean().refine((v) => v === true, { message: "required" })
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
          return <FormCheckboxConfirm label={formItem.label} />
        case "select":
          return (
            <FormConfirmField
              formItem={formItem}
              value={
                formItem.options.find(
                  (option) => option.value === getValues(formItem.name)
                )?.label || "-"
              }
            />
          )
        default:
          return (
            <FormConfirmField
              formItem={formItem}
              value={(getValues(formItem.name) as string) || "-"}
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
    if (confirmMode) {
      return (
        <div>
          <Button type="button" onClick={toggleConfirmMode}>
            戻る
          </Button>
          <Button type="submit">送信</Button>
        </div>
      )
    }
    return (
      <Button type="button" onClick={handleSubmit(toggleConfirmMode)}>
        内容を確認
      </Button>
    )
  }, [confirmMode, toggleConfirmMode, handleSubmit])

  return {
    renderFormItem,
    renderButtons,
    handleSubmit,
    toggleConfirmMode,
    confirmMode
  }
}
