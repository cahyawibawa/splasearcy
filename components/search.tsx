'use client'

import { useEffect, useState } from 'react'

import { usePhotoStore } from '@/lib/use-photo-store'

import { Icons } from './icons'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const { fetchPhotos, setQuery, fetchTrendingSearches, trendingSearches } =
    usePhotoStore()

  useEffect(() => {
    fetchTrendingSearches()
  }, [fetchTrendingSearches])

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setQuery(searchText)
    fetchPhotos(searchText)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    setQuery(value)
    fetchPhotos(value)
  }

  const handleTrendingSearch = (trend: string) => {
    setSearchText(trend)
    setQuery(trend)
    fetchPhotos(trend)
  }

  return (
    <div className="mx-auto mb-8 w-full max-w-sm">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-2 ring-0"
      >
        {/* <Icons.search className="absolute left-4 top-2/4 size-4 translate-y-[-50%] text-muted-foreground" /> */}
        <Input
          className="text-muted-foreground rounded-xl bg-transparent"
          onChange={handleInputChange}
          value={searchText}
          type="text"
          spellCheck={false}
          placeholder="Search photos and illustrations..."
        />
        {/* <Button
          type="submit"
          variant="outline"
          size="icon"
          className="rounded-lg"
        >
          <Icons.search className="size-3.5" />
        </Button> */}
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {trendingSearches.map((trend) => (
          <Button
            key={trend}
            size="sm"
            variant="ghost"
            className="h-6 gap-0.5 rounded-full border border-gray-200 bg-gray-50 px-2 text-xs text-gray-900"
            onClick={() => handleTrendingSearch(trend)}
          >
            {trend}
            <Icons.trending className="size-3" />
          </Button>
        ))}
      </div>
    </div>
  )
}
