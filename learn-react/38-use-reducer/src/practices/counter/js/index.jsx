import useCounter from './hook';
import { Minus, Plus } from 'lucide-react';

export default function Counter({ count = 0, step = 1, min = 0, max = 9 }) {
  const counterStore = useCounter({ count, step, min, max });
  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        className="disabled:cursor-not-allowed"
        disabled={counterStore.isMinDisabled}
        onClick={counterStore.onMinus}
      >
        <Minus />
      </button>

      <output className="text-9xl text-white select-none">
        {counterStore.count}
      </output>

      <button
        type="button"
        aria-label="카운트 증가"
        className="disabled:cursor-not-allowed"
        disabled={counterStore.isMaxDisabled}
        onClick={counterStore.onPlus}
      >
        <Plus />
      </button>
    </div>
  );
}
