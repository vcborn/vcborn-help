import Document, { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default class HelpDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
