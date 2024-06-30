import ContactHeader from '@/components/ContactHeader'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Search from '@/components/Search'

export interface Props {
  title: string
}

export default function Layout({
  children,
  search = true,
}: {
  children: React.ReactNode
  search?: boolean
}) {
  return (
    <div className='relative min-h-screen'>
      <Header />
      {search ? <Search /> : <ContactHeader />}
      <div className='pt-8 container max-w-6xl mx-auto'>{children}</div>
      <Footer />
    </div>
  )
}
