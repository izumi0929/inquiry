import { zodResolver } from "@hookform/resolvers/zod"
import { FormEvent, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { searchAddressByPostalcode } from "@/api/search-address"
import { InConfirmButtons } from "@/app/inquiry/_components/in-confirm-buttons"
import { InConfirmForm } from "@/app/inquiry/_components/in-confirm-form"
import { InEditButtons } from "@/app/inquiry/_components/in-edit-buttons"
import { InEditForm } from "@/app/inquiry/_components/in-edit-form"
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

  const renderFormItem = useCallback(
    (formItem: FormItem) => {
      return confirmMode ? (
        <InConfirmForm formItem={formItem} getValues={getValues} />
      ) : (
        <InEditForm
          formItem={formItem}
          register={register}
          errors={errors}
          searchAddress={searchAddress}
          getValues={getValues}
        />
      )
    },
    [errors, confirmMode, register, getValues, searchAddress]
  )

  const renderButtons = useCallback(() => {
    return confirmMode ? (
      <InConfirmButtons onClickBack={toggleConfirmMode} loading={loading} />
    ) : (
      <InEditButtons onClickConfirm={handleSubmit(toggleConfirmMode)} />
    )
  }, [confirmMode, loading, toggleConfirmMode, handleSubmit])

  return {
    renderFormItem,
    renderButtons,
    handleComplete
  }
}
