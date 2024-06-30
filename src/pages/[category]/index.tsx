import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowForward } from 'react-icons/io'
import Layout from '@/layouts/Layout'
import contentfulClient from '@/lib/contentful'
import { TypeSupportSkeleton } from '@/types/contentful'
import { EntryCollection } from 'contentful'

const cat = {
  mcborn: "MCborn",
  vcmi: "VCMi",
  vclinux: "VCLinux"
}

export async function getStaticPaths() {
  const articles = await contentfulClient.getEntries<TypeSupportSkeleton>({ content_type: 'support' })
  return {
    paths: articles.items.map((post) => {
      return {
        params: { category: post.fields.category.toString().toLowerCase() },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { category }: {category: string} = params
  const articles = await contentfulClient.getEntries<TypeSupportSkeleton>({
    content_type: 'support',
    'fields.category': cat[category],
  })
  return {
    props: { articles },
  }
}

const Category = ({articles}: {articles: EntryCollection<TypeSupportSkeleton>}) => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <Head>
        <title>{`${cat[category.toString()]} | VCborn Support`}</title>
      </Head>
      <div className='px-4 pb-20'>
        <nav className='text-md text-gray-400 pb-6'>
          <ul className='flex items-center'>
            <li>
              <Link href='/' className='flex items-center mr-3 duration-200 hover:text-black'>
                VCborn Support <IoIosArrowForward className='ml-3' />
              </Link>
            </li>
            <li>
              <Link
                href={`/${category.toString()}`}
                className='flex items-center mr-3 duration-200 hover:text-black'
              >
                {cat[category.toString()]} <IoIosArrowForward className='ml-3' />
              </Link>
            </li>
          </ul>
        </nav>
        <h2 className='text-4xl font-bold mb-3'>{cat[category.toString()]}</h2>
        {articles.items.map((article, i) => {
          return (
            <article key={article.sys.id} className='py-2'>
              <Link href={`/${category.toString().toLowerCase()}/${article.sys.id}`}>
                <h3 className='text-gray-400 duration-200 hover:text-black'>{article.fields.title.toString()}</h3>
              </Link>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default Category
