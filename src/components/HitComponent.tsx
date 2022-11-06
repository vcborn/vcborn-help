import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
// eslint-disable-next-line import/named
import { Hit } from 'react-instantsearch-core'
import { Hits, connectSearchBox } from 'react-instantsearch-dom'

interface HitDoc {
  objectID: string
  category: string
  title: string
}

interface Props {
  hit: Hit<HitDoc>
}

interface HitComponentProps extends Props {
  onClick: () => void
}

function HitComponent({ hit, onClick }: HitComponentProps): JSX.Element {
  return (
    <div>
      <Link href={`/${hit.category}/${hit.objectID}`}>
        <button
          className='bg-white text-gray-500 py-4 duration-200 hover:text-black px-8 text-sm text-left w-full'
          onClick={onClick}
        >
          {hit.title}
        </button>
      </Link>
    </div>
  )
}

export const SearchResult = connectSearchBox(({ refine, currentRefinement }) => {
  const [isShow, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(!!currentRefinement)
  }, [currentRefinement])

  const handleResetSearchWords = useCallback(() => {
    refine('')
  }, [refine])

  const hitComponent = ({ hit }: Props): JSX.Element => (
    <HitComponent hit={hit} onClick={handleResetSearchWords} />
  )

  if (!isShow) return null
  return <Hits hitComponent={hitComponent} />
})
