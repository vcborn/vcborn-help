// eslint-disable-next-line import/named
import { MultipleQueriesQuery } from '@algolia/client-search'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Configure } from 'react-instantsearch-dom'
import { SearchResult } from './HitComponent'
import { useLocale } from '@/hooks/useLocale'

const Search = () => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
  )
  const mock = {
    hits: [],
    nbHits: 0,
    nbPages: 0,
    page: 0,
    processingTimeMS: 0,
  }
  const searchClient = {
    ...algoliaClient,
    search(requests: MultipleQueriesQuery[]) {
      if (requests.every(({ params }) => !params?.query)) {
        return Promise.resolve(mock)
      }
      return algoliaClient.search(requests)
    },
  }
  const indexName = 'help'
  const { t } = useLocale()
  return (
    <div className='bg-gray-100 pt-48 pb-12'>
      <div className='px-4 max-w-6xl mx-auto'>
        <h1 className='text-5xl font-bold'>{t.SEARCH.HELP}</h1>
        <div className='relative max-w-[39rem] mt-10'>
          <svg viewBox='0 0 24 24' color='#757d85' className='w-4 h-4 absolute left-4 top-[1.1rem]'>
            <g fill='currentColor'>
              <path
                fill='currentColor'
                d='M3 10.5a7.5 7.5 0 1 1 13.28 4.78l4.377 4.377a1 1 0 0 1-1.414 1.414L14.81 16.64A7.5 7.5 0 0 1 3 10.5zm7.5 5.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'
              ></path>
            </g>
          </svg>
          <InstantSearch indexName={indexName} searchClient={searchClient}>
            <Configure hitsPerPage={5} />
            <SearchBox translations={{ placeholder: t.SEARCH.TEXT }} />
            <div className='absolute top-14 w-full'>
              <SearchResult />
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}

export default Search
