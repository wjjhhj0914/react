export default function performanceDelay(delay = 100) {
  const start = performance.now()
  while (performance.now() - start <= delay) {
    // 성능 지연
  }
}
