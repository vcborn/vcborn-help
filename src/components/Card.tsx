import Link from 'next/link'
//import { useLocale } from '@/hooks/useLocale'

type Article = {
  id: string
  title: string
  category: string
  date_created: Date
  date_updated: Date
  user_created: string
  draft: Boolean
  content: string
}

const cat = {
  vclinux: 'VCLinux',
  reamix: 'Reamix',
  mcborn: 'MCborn',
  other: 'Other',
}

const Card = ({ title, articles }: { title: string; articles?: Article[] }) => {
  //const { t } = useLocale()
  return (
    <div className='mb-12 md:mb-24' key={title}>
      <h2 className='text-3xl font-bold mb-4'>{cat[title]}</h2>
      <ul className='text-gray-500'>
        {articles.map((article, index) => {
          if (title === article.category && index <= 3)
            return (
              <li className='py-2' key={article.id}>
                <Link
                  href={`/${article.category}/${article.id}`}
                  className='duration-200 hover:text-black'
                >
                  {article.title}
                </Link>
              </li>
            )
          if (title === article.category && index >= 4)
            return (
              <li className='mt-6' key={article.category}>
                <Link
                  className='text-black border-black border-4 duration-200 hover:text-white hover:bg-black px-3 py-1 font-bold'
                  href={`/${title}`}
                >
                  すべて表示
                </Link>
              </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Card
