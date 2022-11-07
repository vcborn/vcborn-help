import Link from "next/link"
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MdTranslate } from "react-icons/md"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Footer = () => {
  function moveToLangPage() {
    let currentUrl = location.pathname
    const regex = new RegExp('/(?:[ce]n|ko)')
    if (regex.test(currentUrl)) {
      currentUrl = currentUrl.slice(3)
    }
    return currentUrl
  }

  const NextLink = ({ href, locale, children, ...rest }) => (
    <Link href={href} locale={locale} {...rest} passHref>
      {children}
    </Link>
  )

  return (
    <footer className='bg-gray-100 w-full px-4 absolute bottom-0'>
      <div className='relative container mx-auto max-w-6xl py-6 text-sm flex justify-between items-center'>
        <p className='font-medium text-gray-500'>&copy; VCborn 2022</p>
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="duration-200 hover:opacity-80">
            <MdTranslate size={25} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-12 right-0 mt-2 w-56 rounded origin-bottom-right divide-y divide-gray-100 bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div>
              <Menu.Item>
                {({ active }) => (
                  <NextLink href={moveToLangPage()} locale='ja'>
                    <span
                      className={classNames(active && 'bg-black text-white', 'duration-200 block px-4 py-2')}
                    >
                      日本語
                    </span>
                  </NextLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <NextLink href={moveToLangPage()} locale='en'>
                    <span
                      className={classNames(active && 'bg-black text-white', 'duration-200 block px-4 py-2')}
                    >
                      English
                    </span>
                  </NextLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <NextLink href={moveToLangPage()} locale='cn'>
                    <span
                      className={classNames(active && 'bg-black text-white', 'duration-200 block px-4 py-2')}
                    >
                      中文
                    </span>
                  </NextLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <NextLink href={moveToLangPage()} locale='ko'>
                    <span
                      className={classNames(active && 'bg-black text-white', 'duration-200 block px-4 py-2')}
                    >
                      한국어
                    </span>
                  </NextLink>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      </div>
    </footer>
  )
}

export default Footer
