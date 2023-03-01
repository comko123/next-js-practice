import Document, { Head, Html, Main, NextScript } from "next/document"

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
        <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@900&family=Tilt+Neon&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument