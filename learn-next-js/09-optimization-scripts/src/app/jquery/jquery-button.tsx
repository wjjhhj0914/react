'use client'

export default function JqueryButton() {
  return (
    <button
      type="button"
      className="p-2 bg-black text-white px-4"
      onClick={() => {
        // @ts-expect-error jQuery 코드로 이후 제거
        jQuery('h1').html(
          'jQuery <abbr title="Content Derivery Network">CDN</abbr> 로드'
        )
      }}
    >
      jQuery 로드 및 적용
    </button>
  )
}
