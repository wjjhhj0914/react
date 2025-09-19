// 서버 측에서 렌더링되는 컴포넌트
// 렌더링 이후에도 클라이언트 측에서 하이드레이션(수화) 필요
export default function TrandingProducts({ data }) {
  // data: getServerSideProps 함수에서 반환된 products 데이터 값

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

// 서버 측에서 데이터를 가져와 컴포넌트에 속성으로 전달하는 함수
export function getServerSideProps() {
  // 데이터베이스 연결
  const link = mysqliConnect('localhost', 'root', 'password')
  // 데이터베이스에서 products 데이터 가져오기
  const data = mysqliQuery(link, 'SELECT * FROM products')

  // props.data 값으로 products 데이터를 설정해 반환
  return {
    props: {
      data,
    },
  }
}
