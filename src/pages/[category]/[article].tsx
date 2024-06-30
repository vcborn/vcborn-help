import { format } from 'date-fns'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowForward } from 'react-icons/io'
import { MdUpdate, MdAccessTime } from 'react-icons/md'
import Layout from '@/layouts/Layout'
import contentfulClient from '@/lib/contentful'
import { TypeSupportSkeleton } from '@/types/contentful'
import { Entry } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS } from '@contentful/rich-text-types'

const cat = {
  mcborn: 'MCborn',
  vcmi: 'VCMi',
  vclinux: 'VCLinux',
}

export async function getStaticPaths() {
  const articles = await contentfulClient.getEntries<TypeSupportSkeleton>({
    content_type: 'support',
  })
  return {
    paths: articles.items.map((article) => {
      return {
        params: {
          category: article.fields.category.toString().toLowerCase(),
          article: article.sys.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { article } = params
  const post = await contentfulClient.getEntry<TypeSupportSkeleton>(article)
  return {
    props: { post },
  }
}

const Category = ({ post }: { post: Entry<TypeSupportSkeleton> }) => {
  const router = useRouter()
  const { category } = router.query
  return (
    <Layout>
      <Head>
        <title>{`${post.fields.title} | VCborn Support`}</title>
      </Head>
      <div className='px-4 pb-60'>
        <nav className='text-md text-gray-400 pb-6'>
          <ul className='flex items-center'>
            <li>
              <Link href='/' className='flex items-center mr-3 duration-200 hover:text-black'>
                VCborn Support <IoIosArrowForward className='ml-3' />
              </Link>
            </li>
            <li>
              <Link
                href={`/${category.toString().toLowerCase()}`}
                className='flex items-center mr-3 duration-200 hover:text-black'
              >
                {cat[category.toString()]} <IoIosArrowForward className='ml-3' />
              </Link>
            </li>
          </ul>
        </nav>
        <h2 className='text-4xl font-bold mb-3'>{post.fields.title.toString()}</h2>
        <div className='flex my-5 text-gray-500'>
          {post.fields.date_updated && (
            <time className='flex items-center mr-4'>
              <MdUpdate size={20} className='mr-1' />
              {format(new Date(post.fields.date_updated.toString()), 'yyyy/MM/dd')}
            </time>
          )}
          <time className='flex items-center'>
            <MdAccessTime size={20} className='mr-1' />
            {format(new Date(post.fields.date_created.toString()), 'yyyy/MM/dd')}
          </time>
        </div>
        <div className='prose lg:prose-md max-w-3xl'>
          {documentToReactComponents(post.fields.content as Document, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                const src = 'https:' + node.data.target.fields.file.url
                const height = node.data.target.fields.file.details.height
                const width = node.data.target.fields.file.details.width
                return <img src={src} width={width} height={height} />
              },
            },
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Category
