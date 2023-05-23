import { FC } from "react"

import { Button } from "@/app/_components/button"

type Props = {
  onClickConfirm: () => void
}

export const InEditButtons: FC<Props> = ({ onClickConfirm }) => {
  return (
    <Button type="button" onClick={onClickConfirm}>
      内容を確認
    </Button>
  )
}
