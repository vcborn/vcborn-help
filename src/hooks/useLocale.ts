import { useRouter } from 'next/router'
import cn from '@/locales/cn'
import en from '@/locales/en'
import ja from '@/locales/ja'
import ko from '@/locales/ko'

export const useLocale = () => {
  const { locale } = useRouter()
  let t = null
  if (locale == 'ja') {
    t = ja
  } else if (locale == 'en') {
    t = en
  } else if (locale == 'cn') {
    t = cn
  } else if (locale == 'ko') {
    t = ko
  }
  return { locale, t }
}
