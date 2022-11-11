import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowForward } from 'react-icons/io'
import Layout from '@/layouts/Layout'
import { getDirectusClient } from '@/lib/directus'

const cat = {
  vclinux: 'VCLinux',
  reamix: 'Reamix',
  mcborn: 'MCborn',
  vcmi: "VCMi",
  bot: "Bot",
  shiftium: "Shiftium",
  other: 'Other',
}

export async function getStaticPaths() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('help').readByQuery({
    fields: 'category',
    limit: -1,
  })
  return {
    paths: data.map((post) => {
      return {
        params: { category: post.category.toString() },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { category } = params
  const directus = await getDirectusClient()
  const { data } = await directus.items('help').readByQuery({
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

const Category = (posts) => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <Head>
        <title>{`${cat[category as keyof typeof cat]} | VCborn Support`}</title>
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
        <h2 className='text-4xl font-bold mb-3'>{cat[category as keyof typeof cat]}</h2>
        {posts.data.map((post) => {
          return (
            <article key={post.id} className='py-2'>
              <Link href={`/${category}/${post.id}`}>
                <h3 className='text-gray-400 duration-200 hover:text-black'>{post.title}</h3>
              </Link>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default Category
