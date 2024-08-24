import { create } from 'zustand'

export interface Photo {
  id: string
  urls: {
    small: string
    regular: string
    raw: string
  }
  alt_description: string
  user: {
    username: string
    portfolio_url: string
    profile_image: {
      large: string
    }
  }
}

interface PhotoStore {
  photos: Photo[]
  selectedPhoto: Photo | null
  isViewOpen: boolean
  page: number
  hasMore: boolean
  query: string
  trendingSearches: string[]
  setPhotos: (photos: Photo[]) => void
  addPhotos: (photos: Photo[]) => void
  setSelectedPhoto: (photo: Photo | null) => void
  setIsViewOpen: (isOpen: boolean) => void
  fetchPhotos: (newQuery?: string) => Promise<void>
  incrementPage: () => void
  setQuery: (query: string) => void
  fetchTrendingSearches: () => Promise<void>
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  selectedPhoto: null,
  isViewOpen: false,
  page: 1,
  hasMore: true,
  query: '',
  trendingSearches: [],
  setPhotos: (photos) => set({ photos }),
  addPhotos: (newPhotos) =>
    set((state) => ({ photos: [...state.photos, ...newPhotos] })),
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  setIsViewOpen: (isOpen) => set({ isViewOpen: isOpen }),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  setQuery: (query) => set({ query, page: 1, photos: [] }),
  fetchPhotos: async (newQuery?: string) => {
    const { page, query } = get()
    const searchQuery = newQuery !== undefined ? newQuery : query
    const perPage = 10
    try {
      const url = searchQuery
        ? `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${API_KEY}&page=${page}&per_page=${perPage}`
        : `https://api.unsplash.com/photos?client_id=${API_KEY}&page=${page}&per_page=${perPage}`
      const response = await fetch(url)
      const data = await response.json()
      const photos = searchQuery ? data.results : data
      if (page === 1) {
        set({ photos, hasMore: photos.length === perPage, query: searchQuery })
      } else {
        set((state) => ({
          photos: [...state.photos, ...photos],
          hasMore: photos.length === perPage,
        }))
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  },

  // category
  fetchTrendingSearches: async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/topics?client_id=${API_KEY}&per_page=3`
      )
      const data = await response.json()
      const trendingSearches = data.map((topic: any) => topic.title)
      set({ trendingSearches })
    } catch (error) {
      console.error('Error fetching trending searches:', error)
    }
  },
}))
