import Layout from '@/layouts/Layout'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()
  const onSubmit = async (data) => {
    const loading = toast.loading('送信中...')
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      toast.error('reCAPTCHAが利用できません。もう一度お試しください。', { id: loading })
      return
    }
    const reCaptchaToken = await executeRecaptcha('contactForm')
    const emailDomain = data.email.split('@')[1]
    const ignoreDomains = ['example.com', 'example.org']
    if (ignoreDomains.includes(emailDomain)) {
      toast.error('無効なメールアドレスです。', { id: loading })
      return
    }
    const mailres = await fetch('https://vcborn.com/api/contact', {
      body: JSON.stringify({
        name: data.name,
        furigana: data.furigana,
        email: data.email,
        subject: data.subject,
        message: data.message,
        token: reCaptchaToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    if (!mailres.ok) {
      toast.error('お問い合わせの送信に失敗しました。', { id: loading })
      console.error('Failed to send email')
      return
    }
    toast.success('お問い合わせを送信しました。', { id: loading })
    router.push('/thanks')
  }

  return (
    <Layout search={false}>
      <Head>
        <title>お問い合わせ | VCborn Support</title>
      </Head>
      <div className='px-4 pb-60 max-w-3xl'>
        <p className='mb-4'>
          <span className='text-red-500 font-bold'>*</span> は必須項目です。
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='pb-6'>
            <label htmlFor='name' className='block pb-2'>
              お名前 <span className='text-red-500 font-bold'>*</span>
            </label>
            <input
              type='text'
              id='name'
              className='w-full border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-red-500'>名前は必須です。</span>}
          </div>
          <div className='pb-6'>
            <label htmlFor='furigana' className='block pb-2'>
              ふりがな <span className='text-red-500 font-bold'>*</span>
            </label>
            <input
              type='text'
              id='furigana'
              className='w-full border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
              {...register('furigana', { required: true })}
            />
            {errors.furigana && <span className='text-red-500'>ふりがなは必須です。</span>}
          </div>
          <div className='pb-6'>
            <label htmlFor='email' className='block pb-2'>
              メールアドレス <span className='text-red-500 font-bold'>*</span>
            </label>
            <input
              type='email'
              id='email'
              className='w-full border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
              {...register('email', { required: true })}
            />
            {errors.email && <span className='text-red-500'>メールアドレスは必須です。</span>}
          </div>
          <div className='pb-6'>
            <label htmlFor='subject' className='block pb-2'>
              お問い合わせ項目 <span className='text-red-500 font-bold'>*</span>
            </label>
            <select
              id='subject'
              className='w-full border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
              {...register('subject', { required: true })}
            >
              <option value=''>選択してください</option>
              <option value='ご質問・お問い合わせ'>ご質問・お問い合わせ</option>
              <option value='ご意見・ご感想'>ご意見・ご感想</option>
              <option value='その他'>その他</option>
            </select>
            {errors.subject && <span className='text-red-500'>お問い合わせ項目は必須です。</span>}
          </div>
          <div className='pb-6'>
            <label htmlFor='message' className='block pb-2'>
              お問い合わせ内容 <span className='text-red-500 font-bold'>*</span>
            </label>
            <textarea
              id='message'
              className='w-full border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
              {...register('message', { required: true })}
            />
            {errors.message && <span className='text-red-500'>お問い合わせ内容は必須です。</span>}
          </div>
          <div className='pb-6'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='privacy'
                className='mr-2 text-black border border-gray-300 p-2 outline-offset-0 duration-100 focus:border-gray-300 focus:ring-0 focus:outline-2 focus:outline-black'
                {...register('privacy', { required: true })}
              />
              <label htmlFor='privacy'>
                <a href='https://vcborn.com/privacy' rel='noopener noreferrer' target='_blank'>
                  プライバシーポリシー
                </a>
                に同意する
              </label>
            </div>
            {errors.privacy && (
              <span className='text-red-500'>プライバシーポリシーに同意する必要があります。</span>
            )}
          </div>
          <button
            type='submit'
            className='bg-black text-white w-full px-6 py-2 hover:opacity-70 duration-200'
          >
            送信
          </button>
        </form>
        <div className='my-10'>
          <p className='text-lg'>
            このサイトはreCAPTCHAによって保護されており、Googleの
            <a
              href='https://policies.google.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary dark:text-blue-500 duration-200 hover:opacity-80'
            >
              プライバシーポリシー
            </a>
            と
            <a
              href='https://policies.google.com/terms'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary dark:text-blue-500 duration-200 hover:opacity-80'
            >
              利用規約
            </a>
            が適用されます。
          </p>
        </div>
      </div>
    </Layout>
  )
}
