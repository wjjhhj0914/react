export interface QuotesResponse {
  quotes: Quote[]
  total: number
  skip: number
  limit: number
}

export interface Quote {
  id: number
  quote: string
  author: string
}

export interface QuoteError {
  message: string
}

export const fetchQuotes = async (): Promise<QuotesResponse> => {
  const response = await fetch('https://dummyjson.com/quotes')
  return response.json()
}

export const fetchQuoteById = async (
  id: number | string
): Promise<Quote | QuoteError> => {
  const response = await fetch(`https://dummyjson.com/quotes/${id}`)
  return response.json()
}
