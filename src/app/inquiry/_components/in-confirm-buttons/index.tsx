import { FC } from "react"

import { Button } from "@/app/_components/button"

type Props = {
  onClickBack: () => void
  loading: boolean
}

export const InConfirmButtons: FC<Props> = ({ onClickBack, loading }) => {
  return (
    <>
      <Button type="button" onClick={onClickBack} variant="outlined">
        戻る
      </Button>
      <Button type="submit" disabled={loading}>
        送信
      </Button>
    </>
  )
}
