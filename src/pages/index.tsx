import Head from 'next/head'
import Card from '@/components/Card'
import Layout from '@/layouts/Layout'
import contentfulClient from '@/lib/contentful'
import { EntryCollection } from 'contentful'
import { TypeSupportSkeleton } from '@/types/contentful'

export async function getStaticProps({ params }) {
  const articles = await contentfulClient.getEntries({ content_type: 'support' })
  const categories = articles.items.map((category) => {
    return category.fields.category
  })
  return {
    props: { categories: Array.from(new Set(categories)).reverse(), articles },
  }
}

const Home = ({categories, articles}: {categories: string[], articles: EntryCollection<TypeSupportSkeleton>}) => {
  return (
    <Layout>
      <Head>
        <title>VCborn Support</title>
      </Head>
      <div className='px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
        {categories.map((c) => {
          return <Card key={c} title={c} articles={articles} />
        })}
      </div>
    </Layout>
  )
}

export default Home
