import { FC } from "react"

import { Button } from "@/app/_components/button"
import { ActionButtonsContainer } from "@/app/inquiry/_components/action-buttons/action-buttons-container"

type Props = {
  onClickBack: () => void
  loading: boolean
}

export const InConfirmButtons: FC<Props> = ({ onClickBack, loading }) => {
  return (
    <ActionButtonsContainer>
      <Button type="button" onClick={onClickBack} variant="outlined">
        戻る
      </Button>
      <Button type="submit" disabled={loading}>
        送信
      </Button>
    </ActionButtonsContainer>
  )
}
