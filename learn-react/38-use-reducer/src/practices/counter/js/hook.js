import { useReducer } from 'react';
import { reducer, init, plusAction, minusAction } from './reducer';

export default function useCounter({
  count = 0,
  step = 1,
  min = 0,
  max = 9,
} = {}) {
  const [state, dispatch] = useReducer(reducer, count, init); // state: counterStore

  const isMinDisabled = state.count === min;
  const isMaxDisabled = state.count === max;

  const handleMinus = () => dispatch(minusAction(step, min));
  const handlePlus = () => dispatch(plusAction(step, max));

  return {
    ...state,
    isMinDisabled,
    isMaxDisabled,
    onPlus: handlePlus,
    onMinus: handleMinus,
  };
}
