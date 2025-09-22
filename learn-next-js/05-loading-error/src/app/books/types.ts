export interface KakaoBooksResponse {
  documents: Document[]
  meta: Meta
}

export interface Document {
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

export type Status = '정상판매' | '품절' | '절판'

export interface Meta {
  is_end: boolean
  pageable_count: number
  total_count: number
}
