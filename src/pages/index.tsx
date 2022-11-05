import Head from 'next/head'
import Card from '@/components/Card'
import Layout from '@/layouts/Layout'
import { getDirectusClient } from '@/lib/directus'

export async function getStaticProps({ params }) {
  const directus = await getDirectusClient()
  const { data } = await directus.items('help').readByQuery({
    sort: ['title'],
    limit: -1,
  })
  const categories = data.map((category) => {
    return category.category
  })
  return {
    props: { category: Array.from(new Set(categories)), articles: data },
  }
}

const Home = (params) => {
  return (
    <Layout>
      <Head>
        <title>VCborn Support</title>
      </Head>
      <div className='px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4'>
        {params.category.map((c) => {
          return <Card key={c} title={c} articles={params.articles} />
        })}
      </div>
    </Layout>
  )
}

export default Home
