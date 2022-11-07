import Head from 'next/head'
import Link from 'next/link'
//import { useLocale } from '@/hooks/useLocale'

const NotFound = () => {
  //const { t } = useLocale()
  return (
    <div className='bg-gray-100'>
      <div className='bg-white max-w-3xl relative min-h-screen flex flex-col justify-center'>
        <Head>
          <title>404 | VCborn Support</title>
        </Head>
        <Link href='/'>
          <h2 className='absolute top-0 font-bold text-xl py-6 px-8'>VCborn Support</h2>
        </Link>
        <div className='px-8'>
          <h1 className='font-bold text-5xl'>Oops!</h1>
          <p className='mt-4 mb-8 font-medium text-xl'>お探しの記事はありませんでした。</p>
          <Link
            href='/'
            className='border-4 border-black px-4 py-2 font-semibold duration-200 hover:bg-black hover:text-white'
          >
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
