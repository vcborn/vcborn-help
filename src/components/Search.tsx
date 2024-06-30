//import { useLocale } from '@/hooks/useLocale'
import { EntryCollection } from "contentful"
import { useState } from "react"
import contentfulClient from "@/lib/contentful"
import { TypeSupportSkeleton } from "@/types/contentful"



const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<EntryCollection<TypeSupportSkeleton>>() // [TypeSupportSkeleton
  const searchArticles = async (query) => {
    if (!query) {
      setSearchResults(null)
      return
    }
    const articlesres = await fetch(`https://vcborn.com/api/search?query=${query}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!articlesres.ok) {
      console.error('Failed to search articles')
      return
    }
    const articles = await articlesres.json()
    setSearchResults(articles)
  }
  const typewatch = (function () {
    let timer: number | NodeJS.Timeout = 0;
    return function (callback: () => void, ms: number) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
  //const { t } = useLocale()
  return (
    <div className='bg-gray-100 pt-48 pb-12'>
      <div className='px-4 max-w-6xl mx-auto relative'>
        <h1 className='text-5xl font-bold'>お探しの記事はなんですか？</h1>
        <div className='relative max-w-[39rem] mt-10'>
          <svg viewBox='0 0 24 24' color='#757d85' className='w-4 h-4 absolute left-4 top-[1.1rem]'>
            <g fill='currentColor'>
              <path
                fill='currentColor'
                d='M3 10.5a7.5 7.5 0 1 1 13.28 4.78l4.377 4.377a1 1 0 0 1-1.414 1.414L14.81 16.64A7.5 7.5 0 0 1 3 10.5zm7.5 5.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
              ></path>
            </g>
          </svg>
          <input
            type='text'
            placeholder='記事を検索...'
            value={searchText}
            onKeyUp={(e) => {
              typewatch(() => searchArticles(searchText), 1500)
            }}
            onChange={(e) => {
              setSearchResults(null)
              setSearchText(e.target.value)
            }}
            className='w-full pl-12 text-sm pr-4 py-4 border-0 outline-offset-0 duration-100 focus:ring-0 focus:outline-2 focus:outline-black'
          />
        </div>
        {searchResults && (
          <div className='mt-2 absolute max-w-[39rem] w-full bg-white'>
            {searchResults && searchResults.items.length > 0 ? (
              <ul>
                {searchResults.items.map((article) => (
                  <li className='py-4 px-6 text-gray-500' key={article.sys.id}>
                    <a href={`/${article.fields.category.toString().toLowerCase()}/${article.sys.id}`} className='duration-200 hover:text-black'>
                      {article.fields.title.toString()}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-500'>検索結果はありません。</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
