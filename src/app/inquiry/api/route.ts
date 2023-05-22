import { redirect } from "next/navigation"

export const POST = async (request: Request) => {
  // eslint-disable-next-line no-console
  console.log("送信データ", await request.formData())
  redirect("/inquiry/completed")
}
