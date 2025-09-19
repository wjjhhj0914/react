import useSWR from 'swr'

// 데이터 가져오기 함수
async function fetcher(endpoint) {
  const response = await fetch(endpoint)
  const json = await response.json()
  return json
}

// 클라이언트 컴포넌트
function TrendingProducts() {
  // 데이터 가져오기 요청
  // - data: null
  // - isLoading: true
  const { data, isLoading } = useSWR('/api/get-trending-products', fetcher)

  if (isLoading) {
    return <p>데이터 로딩중...</p>
  }

  return (
    <main>
      <h1>트렌드 제품</h1>
      {data.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </main>
  )
}
