## お問い合わせフォーム

### 動作確認手順

フォームの入力・確認・送信だけであれば以下の URL から確認可能です。

https://inquiry-gules.vercel.app/inquiry

- 入力画面
  - 必須項目を入力して、「内容を確認」ボタンを押すと、確認画面（モード）移ります。
  - メールアドレスは形式が誤っているとバリデーションに引っかかります。
  - 住所は郵便番号から検索可能です。
- 確認画面
  - 入力した内容を確認できます。
  - 未入力の項目はハイフン(-)で表示されます。
  - 「戻る」ボタンを押すと編集画面（モード）に戻ります。
  - 「送信」ボタンを押すと送信完了画面に移ります。
- 完了画面
  - 送信が完了した旨の文言が表示されます。
  - 「お問い合わせトップに戻る」ボタンを押すと編集画面に戻ります。

送信時にブラウザのコンソールにも送信データは出力していますが、遷移してしまうので確認が難しいです。
（以下のように開発者ツールで見ることは可能です。）

<img width="561" alt="スクリーンショット 2023-05-25 20 27 06" src="https://github.com/izumi0929/inquiry/assets/58094202/6537e9af-d679-4130-ba2c-dda6c5834149">

送信データの確認はローカルで Next を立ち上げていただく必要があります。
パッケージインストール後

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

サーバーが立ち上がったら
[http://localhost:3000](http://localhost:3000) から同様の手順で送信できます。
送信データはターミナルに表示されます。

![スクリーンショット 2023-05-25 20 27 56](https://github.com/izumi0929/inquiry/assets/58094202/c42bd23d-909f-4e75-bfb3-64ebb66ef729)

### こだわりポイント

- UX（アクセシビリティ）
  - 必須項目と任意項目が分かり易いようにしました。
  - バリデーションで引っかかった項目がどれなのか、なぜ引っかかったのかが分かり易いようにしました。
  - 住所検索は郵便番号から自動で入力できるようにしました。
  - マウスが利用できない方（状況）でもタブとキーボードだけで操作できるようにしました。
- コンポーネント設計
  - ビューとロジックが分離できるようロジック部分はカスタムフックにまとめました。
  - 保守性を考え、再利用可能なコンポーネントとお問い合わせフォーム固有のコンポーネントで分けました。（あえて AtomicDesign は採用していません）
