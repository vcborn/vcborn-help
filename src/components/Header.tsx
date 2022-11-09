import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'

const Header = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className='absolute md:fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-10 md:py-6'>
      <div className='flex items-center justify-between max-w-6xl mx-auto'>
        <Link href='/'>
          <Image src='/support-icon.svg' alt='VCborn Support' height={60} width={60} />
        </Link>
        <ul className='font-semibold md:flex gap-5 hidden'>
          <li>
            <a href='https://vcborn.com' className='duration-200 hover:opacity-80'>
              VCborn
            </a>
          </li>
          <li>
            <a href='https://status.vcborn.com' className='duration-200 hover:opacity-80'>
              Server Status
            </a>
          </li>
        </ul>
        <FiMenu size={30} onClick={() => setOpen(!open)} className='cursor-pointer md:hidden' />
      </div>
      <div className={`md:hidden pt-5 text-lg ${!open && 'hidden'}`}>
        <ul className='font-semibold flex flex-col gap-2'>
          <li>
            <a href='https://vcborn.com' className='duration-200 hover:opacity-80'>
              VCborn
            </a>
          </li>
          <li>
            <a href='https://status.vcborn.com' className='duration-200 hover:opacity-80'>
              Server Status
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
