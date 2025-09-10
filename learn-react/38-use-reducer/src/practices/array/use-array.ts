import { useCallback, useEffect, useReducer } from 'react';
import {
  clearAction,
  filterAction,
  init,
  pushAction,
  reducer,
  removeAction,
  replaceAction,
  resetAction,
  setAction,
  unshiftAction,
} from './reducer';

export default function useArray<T>(initialValue: T[] = []) {
  const [array, dispatch] = useReducer(reducer<T>, initialValue, init);

  const set = useCallback((newArray: T[]) => dispatch(setAction(newArray)), []);

  const push = useCallback(
    (...items: T[]) => dispatch(pushAction(...items)),
    []
  );

  const unshift = useCallback(
    (...items: T[]) => dispatch(unshiftAction(...items)),
    []
  );

  const replace = useCallback(
    (index: number, item: T) => dispatch(replaceAction(index, item)),
    []
  );

  const filter = useCallback(
    (fn: (item: T, index: number, array: T[]) => boolean) =>
      dispatch(filterAction(fn)),
    []
  );

  const remove = useCallback(
    (removeIndex: number) => removeAction(removeIndex),
    []
  );

  const reset = useCallback(() => dispatch(resetAction()), []);

  const clear = useCallback(() => dispatch(clearAction()), []);

  useEffect(() => {
    // 초깃값(initialValue) 변경 시,
    // 변경된 초깃값으로 배열 상태 초기화
    set(initialValue);
  }, [initialValue, set]);

  return {
    array,
    set,
    push,
    unshift,
    replace,
    filter,
    remove,
    clear,
    reset,
  };
}
