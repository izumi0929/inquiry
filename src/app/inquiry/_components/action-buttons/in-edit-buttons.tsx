import { FC } from "react"

import { Button } from "@/app/_components/button"
import { ActionButtonsContainer } from "@/app/inquiry/_components/action-buttons/action-buttons-container"

type Props = {
  onClickConfirm: () => void
}

export const InEditButtons: FC<Props> = ({ onClickConfirm }) => {
  return (
    <ActionButtonsContainer>
      <Button type="button" onClick={onClickConfirm}>
        内容を確認
      </Button>
    </ActionButtonsContainer>
  )
}
