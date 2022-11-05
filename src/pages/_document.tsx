import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class HelpDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
