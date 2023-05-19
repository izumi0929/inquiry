import "./globals.css"

export const metadata = {
  title: "お問い合わせフォーム",
  description: "製品に関するお問い合わせ"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
