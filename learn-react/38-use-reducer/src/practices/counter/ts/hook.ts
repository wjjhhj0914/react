import { useReducer } from 'react';
import { init, minusAction, plusAction, reducer, resetAction } from './reducer';

interface Args {
  count?: number;
  step?: number;
  min?: number;
  max?: number;
}

export default function useCounter({
  count = 0,
  step = 1,
  min = 0,
  max = 9,
}: Args = {}) {
  const [state, dispatch] = useReducer(reducer, count, init);

  const isMinDisabled = state.count === min;
  const isMaxDisabled = state.count === max;

  const handleMinus = () => dispatch(minusAction(step, min));
  const handlePlus = () => dispatch(plusAction(step, max));
  const handleReset = () => dispatch(resetAction(count));

  return {
    ...state,
    isMinDisabled,
    isMaxDisabled,
    onPlus: handlePlus,
    onMinus: handleMinus,
    onReset: handleReset,
  };
}
