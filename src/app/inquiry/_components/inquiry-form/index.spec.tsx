import { InquiryForm } from "."
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"

const scrollToMock = jest.fn()
const logMock = jest.fn()
jest.spyOn(window, "scrollTo").mockImplementation(scrollToMock)
jest.spyOn(console, "log").mockImplementation(logMock)

describe("inquiry-form", () => {
  describe("初期表示", () => {
    it("名前(姓名)が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("名前(姓名)")).toBeInTheDocument()
    })
    it("ふりがな(姓名)が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("ふりがな(姓名)")).toBeInTheDocument()
    })
    it("社名が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("社名")).toBeInTheDocument()
    })
    it("メールアドレスが表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument()
    })
    it("郵便番号が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("郵便番号")).toBeInTheDocument()
    })
    it("住所が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("住所")).toBeInTheDocument()
    })
    it("電話番号が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("電話番号")).toBeInTheDocument()
    })
    it("どの製品についてが表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("どの製品について")).toBeInTheDocument()
    })
    it("お問い合わせ件名が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("問い合わせ件名")).toBeInTheDocument()
    })
    it("問い合わせ内容が表示されること", () => {
      render(<InquiryForm />)
      expect(screen.getByLabelText("問い合わせ内容")).toBeInTheDocument()
    })
    it("同意チェックボックスが表示されること", () => {
      render(<InquiryForm />)
      const checkbox = screen.getByRole("checkbox")
      const labelLink = screen.getByRole("link", { name: "個人情報の取り扱い" })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
      expect(labelLink).toBeInTheDocument()
    })
    it("確認画面へ進むボタンが表示されること", () => {
      render(<InquiryForm />)
      expect(
        screen.getByRole("button", { name: "内容を確認" })
      ).toBeInTheDocument()
    })
  })
  describe("挙動の確認", () => {
    const fillRequiredFields = () => {
      fireEvent.change(screen.getByLabelText("名前(姓名)"), {
        target: { value: "山田太郎" }
      })
      fireEvent.change(screen.getByLabelText("ふりがな(姓名)"), {
        target: { value: "やまだたろう" }
      })
      fireEvent.change(screen.getByLabelText("メールアドレス"), {
        target: { value: "taro.mountain@gmail.com" }
      })
      fireEvent.change(screen.getByLabelText("問い合わせ件名"), {
        target: { value: "件名" }
      })
      fireEvent.change(screen.getByLabelText("問い合わせ内容"), {
        target: { value: "内容" }
      })
    }
    const fillAllFields = () => {
      fillRequiredFields()
      fireEvent.change(screen.getByLabelText("社名"), {
        target: { value: "○○株式会社" }
      })
      fireEvent.change(screen.getByLabelText("郵便番号"), {
        target: { value: "1234567" }
      })
      fireEvent.change(screen.getByLabelText("住所"), {
        target: { value: "福岡市博多区博多駅前3-23-20博多AGビル6F" }
      })
      fireEvent.change(screen.getByLabelText("電話番号"), {
        target: { value: "09012345678" }
      })
      fireEvent.change(screen.getByLabelText("どの製品について"), {
        target: { value: "1" }
      })
    }
    const clickConfirmButton = () => {
      act(() => {
        screen.getByRole("button", { name: "内容を確認" }).click()
      })
    }
    describe("バリデーション", () => {
      it("未入力で内容確認ボタンを押すとエラーが表示されること", async () => {
        render(<InquiryForm />)
        clickConfirmButton()
        await waitFor(() => {
          expect(screen.getAllByText("必須項目です")).toHaveLength(4)
          expect(
            screen.getByText("メールアドレスの形式で入力してください")
          ).toBeInTheDocument()
          expect(screen.getByText("同意が必要です")).toBeInTheDocument()
        })
      })
      it("メールアドレスが不正な形式で内容確認ボタンを押すとエラーが表示されること", async () => {
        render(<InquiryForm />)
        fireEvent.change(screen.getByLabelText("メールアドレス"), {
          target: { value: "a" }
        })
        clickConfirmButton()
        await waitFor(() => {
          expect(
            screen.getByText("メールアドレスの形式で入力してください")
          ).toBeInTheDocument()
        })
      })
      it("必須項目全て入力し、内容確認ボタンを押すと確認モードになること（スクロールトップに戻ること）", async () => {
        render(<InquiryForm />)
        fillRequiredFields()
        fireEvent.click(screen.getByRole("checkbox"))
        clickConfirmButton()
        await waitFor(() => {
          expect(screen.getByLabelText("名前(姓名)")).toHaveValue("山田太郎")
          expect(screen.getByLabelText("ふりがな(姓名)")).toHaveValue(
            "やまだたろう"
          )
          expect(screen.getByLabelText("メールアドレス")).toHaveValue(
            "taro.mountain@gmail.com"
          )
          expect(screen.getByLabelText("問い合わせ件名")).toHaveValue("件名")
          expect(screen.getByLabelText("問い合わせ内容")).toHaveValue("内容")
          expect(
            screen.getByRole("button", { name: "戻る" })
          ).toBeInTheDocument()
          expect(
            screen.getByRole("button", { name: "送信" })
          ).toBeInTheDocument()
          expect(scrollToMock).toHaveBeenCalledWith(0, 0)
        })
      })
    })
    describe("確認モード", () => {
      it("確認モードで戻るボタンを押すと入力モードに戻ること(スクロールトップに戻ること)", async () => {
        render(<InquiryForm />)
        fillRequiredFields()
        fireEvent.click(screen.getByRole("checkbox"))
        clickConfirmButton()
        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: "戻る" })
          ).toBeInTheDocument()
        })
        act(() => {
          screen.getByRole("button", { name: "戻る" }).click()
        })
        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: "内容を確認" })
          ).toBeInTheDocument()
          expect(scrollToMock).toHaveBeenCalledWith(0, 0)
        })
      })
      it("入力した値がフォームのvalueとして入っていること", async () => {
        const result = render(<InquiryForm />)
        const form = result.container.querySelector("form")
        fillAllFields()
        fireEvent.click(screen.getByRole("checkbox"))
        clickConfirmButton()
        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: "送信" })
          ).toBeInTheDocument()
        })
        await waitFor(() => {
          expect(form).toHaveFormValues({
            name: "山田太郎",
            furigana: "やまだたろう",
            email: "taro.mountain@gmail.com",
            company: "○○株式会社",
            postalcode: "1234567",
            address: "福岡市博多区博多駅前3-23-20博多AGビル6F",
            tel: "09012345678",
            productId: "1",
            title: "件名",
            content: "内容",
            agree: true
          })
        })
      })
      it("selectはラベルが表示されること", async () => {
        render(<InquiryForm />)
        fillAllFields()
        fireEvent.click(screen.getByRole("checkbox"))
        clickConfirmButton()
        await waitFor(() => {
          expect(
            screen.getByRole("button", { name: "送信" })
          ).toBeInTheDocument()
        })
        await waitFor(() => {
          expect(screen.getByText("Aサービスについて")).toBeInTheDocument()
        })
      })
      it("送信ボタン押下で送信できること", async () => {
        const result = render(<InquiryForm />)
        const form = result.container.querySelector("form") as HTMLFormElement
        const submitMock = jest.fn()
        jest.spyOn(form, "submit").mockImplementation(submitMock)

        fillAllFields()
        fireEvent.click(screen.getByRole("checkbox"))
        clickConfirmButton()
        await waitFor(() => {
          const submitButton = screen.getByRole("button", { name: "送信" })
          expect(submitButton).toBeInTheDocument()
          fireEvent.click(submitButton)
        })
        await waitFor(() => {
          expect(submitMock).toHaveBeenCalled()
          expect(logMock).toHaveBeenCalledWith("送信データ", {
            name: "山田太郎",
            furigana: "やまだたろう",
            company: "○○株式会社",
            email: "taro.mountain@gmail.com",
            postalcode: "1234567",
            address: "福岡市博多区博多駅前3-23-20博多AGビル6F",
            tel: "09012345678",
            productId: "1",
            title: "件名",
            content: "内容",
            agree: true
          })
        })
      })
    })
  })
})
