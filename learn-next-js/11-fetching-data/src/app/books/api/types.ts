export interface KakaoBooksQuery {
  query: string
  sort?: 'accuracy' /* 기본값 */ | 'latest'
  page?: number // 1 ~ 50 (기본값: 1)
  size?: number // 1 ~ 50 (기본값: 10)
  target?: 'title' | 'isbn' | 'publisher' | 'person'
}

export interface KakaoBooksQueryResults {
  documents: Book[]
  meta: Meta
}

export interface Book {
  authors: string[]
  contents: string
  datetime: Date
  isbn: string
  price: number
  publisher: string
  sale_price: number
  status: Status
  thumbnail: string
  title: string
  translators: string[]
  url: string
}

type Status = '정상판매' | '품절' | '절판'

interface Meta {
  is_end: boolean
  pageable_count: number
  total_count: number
}
