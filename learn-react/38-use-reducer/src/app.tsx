import { LearnSection } from '@/components';
import Counter from './practices/counter/js';

export default function App() {
  return (
    <LearnSection
      title="랜덤 카운트 업"
      className="p-10 bg-black flex justify-center items-center h-screen"
    >
      <div className="flex flex-col gap-4">
        <Counter count={3} min={2} max={7} step={2} />
      </div>
    </LearnSection>
  );
}
