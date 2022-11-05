import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowForward } from 'react-icons/io'
import { MdUpdate, MdAccessTime } from 'react-icons/md'
import Layout from '@/layouts/Layout'
import { getDirectusClient } from '@/lib/directus'
import { formatRelativeTime } from '@/utils/format-relative-time'

const cat = {
  vclinux: 'VCLinux',
  reamix: 'Reamix',
  mcborn: 'MCborn',
  other: 'Other',
}

export async function getStaticPaths() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('help').readByQuery({
    fields: ['id', 'category'],
    limit: -1,
  })
  return {
    paths: data.map((post) => {
      return {
        params: { category: post.category.toString(), article: post.id.toString() },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { article, category } = params
  const directus = await getDirectusClient()
  const data = await directus.items('help').readOne(article, {
    sort: ['title'],
    filter: {
      category: {
        _eq: category,
      },
    },
    limit: -1,
  })
  return {
    props: { data },
  }
}

const Category = (props) => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <Head>
        <title>{`${props.data.title} | VCborn Support`}</title>
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
                href={`/${category}`}
                className='flex items-center mr-3 duration-200 hover:text-black'
              >
                {cat[category as keyof typeof cat]} <IoIosArrowForward className='ml-3' />
              </Link>
            </li>
          </ul>
        </nav>
        <h2 className='text-4xl font-bold mb-3'>{props.data.title}</h2>
        <div className='flex my-5 text-gray-500'>
          {props.data.date_updated && (
            <time className='flex items-center mr-4'>
              <MdUpdate size={20} className='mr-1' />
              {formatRelativeTime(new Date(props.data.date_updated))}
            </time>
          )}
          <time className='flex items-center'>
            <MdAccessTime size={20} className='mr-1' />
            {formatRelativeTime(new Date(props.data.date_created))}
          </time>
        </div>
        <div
          className='prose lg:prose-md max-w-3xl'
          dangerouslySetInnerHTML={{ __html: props.data.content }}
        />
      </div>
    </Layout>
  )
}

export default Category
