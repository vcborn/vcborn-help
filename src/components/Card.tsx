import { TypeSupportSkeleton } from '@/types/contentful';
import { EntryCollection } from 'contentful';
import Link from 'next/link'
//import { useLocale } from '@/hooks/useLocale'

const Card = ({ title, articles }: { title: string; articles?: EntryCollection<TypeSupportSkeleton> }) => {
  //const { t } = useLocale()
  return (
    <div className='mb-12 md:mb-24' key={title.toLowerCase()}>
      <h2 className='text-3xl font-bold mb-4'>{title}</h2>
      <ul className='text-gray-500'>
        {articles.items.map((article) => {
          if (
            title === article.fields.category &&
            articles.items
              .filter((al) => {
                return al.fields.category === title
              })
              .findIndex((al) => al.sys.id === article.sys.id) <= 2
          )
            return (
              <li className='py-2' key={article.sys.id}>
                <Link
                  href={`/${article.fields.category.toLowerCase()}/${article.sys.id}`}
                  className='duration-200 hover:text-black'
                >
                  {article.fields.title}
                </Link>
              </li>
            )
          if (
            title === article.fields.category &&
            articles.items
              .filter((al) => {
                return al.fields.category === title
              })
              .findIndex((al) => al.sys.id === article.sys.id) >= 3
          )
            return (
              <li className='mt-6' key={article.fields.category}>
                <Link
                  className='text-black border-black border-4 duration-200 hover:text-white hover:bg-black px-3 py-1 font-bold'
                  href={`/${title.toLowerCase()}`}
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
