import Layout from '@/layouts/Layout'
import Head from 'next/head'

export default function Thanks() {
  return (
    <Layout search={false}>
      <Head>
        <title>お問い合わせありがとうございました | VCborn Support</title>
        <meta name='robots' content='noindex' />
      </Head>
      <div className='px-4 pb-60 max-w-3xl'>
        <h1 className='text-2xl font-bold'>お問い合わせありがとうございました</h1>
        <p className='mt-4'>
          お問い合わせいただきありがとうございました。内容を確認のうえ、担当者よりご連絡いたします。
        </p>
      </div>
    </Layout>
  )
}
