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
          <Link href='/contact' className='fixed bottom-0 right-0 p-4 bg-black text-white'>
            お問い合わせ
          </Link>
        </body>
      </Html>
    )
  }
}
