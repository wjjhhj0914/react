import { useReducer } from 'react';
import { Minus, Plus } from 'lucide-react';
import { reducer, init, plusAction, minusAction } from './count';

export default function Counter({ count = 0, step = 1, min = 0, max = 9 }) {
  const [counterStore, dispatch] = useReducer(reducer, count, init); // state: counterStore

  const isMinDisabled = counterStore.count === min;
  const isMaxDisabled = counterStore.count === max;

  const handleMinus = () => dispatch(minusAction(step, min));

  const handlePlus = () => dispatch(plusAction(step, max));

  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        className="disabled:cursor-not-allowed"
        disabled={isMinDisabled}
        onClick={handleMinus}
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
        disabled={isMaxDisabled}
        onClick={handlePlus}
      >
        <Plus />
      </button>
    </div>
  );
}
