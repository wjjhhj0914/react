// 서버 컴포넌트
export default async function TrendingProducts() {
  // 데이터베이스 연결
  const link = mysqliConnect('localhost', 'root', 'password')
  // 데이터베이스에서 products 데이터 가져오기
  const data = await mysqliQuery(link, 'SELECT * FROM products')

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
