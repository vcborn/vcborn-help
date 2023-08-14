import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Search from '@/components/Search'

export interface Props {
  title: string
}

export default function Layout({ children }) {
  return (
    <div className='relative min-h-screen'>
      <Header />
      <Search />
      <div className='pt-8 container max-w-6xl mx-auto'>{children}</div>
      <Footer />
    </div>
  )
}
