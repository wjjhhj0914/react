// --------------------------------------------------------------------------
// 타입 선언

type State<T> = T[];

type Action<T> =
  | { type: typeof ACTION.RESET }
  | { type: typeof ACTION.CLEAR }
  | { type: typeof ACTION.SET; payload: { newArray: T[] } }
  | { type: typeof ACTION.PUSH; payload: { items: T[] } }
  | { type: typeof ACTION.UNSHIFT; payload: { items: T[] } }
  | { type: typeof ACTION.REPLACE; payload: { index: number; item: T } }
  | { type: typeof ACTION.REMOVE; payload: { removeIndex: number } }
  | {
      type: typeof ACTION.FILTER;
      payload: { callback: (item: T, index: number, array: T[]) => boolean };
    };

// --------------------------------------------------------------------------
// 초깃값 or 초기화 함수

export const init = <T>(initialValue: T[]): State<T> => initialValue;

// --------------------------------------------------------------------------
// 리듀서(reducer) 함수

export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case ACTION.PUSH: {
      const { items } = action.payload;
      return [...state, ...items];
    }

    case ACTION.UNSHIFT: {
      const { items } = action.payload;
      return [...items, ...state];
    }

    case ACTION.REPLACE: {
      const { index, item: newItem } = action.payload;
      return state.map((prevItem, i) => (i === index ? newItem : prevItem));
    }

    case ACTION.FILTER: {
      const { callback } = action.payload;
      return state.filter(callback);
    }

    case ACTION.REMOVE: {
      const { removeIndex } = action.payload;
      return state.filter((_, i) => i !== removeIndex);
    }

    case ACTION.RESET: {
      return state;
    }

    case ACTION.SET: {
      const { newArray } = action.payload;
      return newArray;
    }

    case ACTION.CLEAR: {
      return [];
    }

    default: {
      return state;
    }
  }
}

// --------------------------------------------------------------------------
// 액션(action) 타입

const ACTION = {
  PUSH: 'array/push',
  UNSHIFT: 'array/unshift',
  REPLACE: 'array/replace',
  FILTER: 'array/filter',
  REMOVE: 'array/remove',
  RESET: 'array/reset',
  CLEAR: 'array/clear',
  SET: 'array/set',
} as const;

// --------------------------------------------------------------------------
// 액션 크리에이터(action creators) 함수

export const pushAction = <T>(...items: T[]): Action<T> => ({
  type: ACTION.PUSH,
  payload: { items },
});

export const unshiftAction = <T>(...items: T[]): Action<T> => ({
  type: ACTION.UNSHIFT,
  payload: { items },
});

export const replaceAction = <T>(index: number, item: T): Action<T> => ({
  type: ACTION.REPLACE,
  payload: { index, item },
});

export const filterAction = <T>(
  callback: (item: T, index: number, array: T[]) => boolean
): Action<T> => ({
  type: ACTION.FILTER,
  payload: { callback },
});

export const removeAction = <T>(removeIndex: number): Action<T> => ({
  type: ACTION.REMOVE,
  payload: { removeIndex },
});

export const resetAction = <T>(): Action<T> => ({
  type: ACTION.RESET,
});

export const clearAction = <T>(): Action<T> => ({
  type: ACTION.CLEAR,
});

export const setAction = <T>(newArray: T[]): Action<T> => ({
  type: ACTION.SET,
  payload: { newArray },
});
