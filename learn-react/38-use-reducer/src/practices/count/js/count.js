// ----------------------------------------------------------------
// 초기화(init) 함수
// - 초기에 Reducer 함수의 초기 상태 값을 설정
export const init = (initialValue = 0) => ({
  count: initialValue,
});

// 초기 상태 값은 어떤 형태일까? (TS에서는 이런 고민이 타입 지정에 해당)
const initialState = {
  count: 0,
};

// ----------------------------------------------------------------
// Reducer 함수 (순수 함수: 동일 입력 -> 동일 출력)
// - 카운트 증가 로직
// - 카운트 감소 로직
export function reducer(state, action) {
  switch (action.type) {
    case ACTION.PLUS: {
      // 변경된 상태 값 반환
      const { max, step } = action.payload; // { max, step }
      const nextCount = state.count + step;
      return { count: nextCount > max ? max : nextCount };
    }
    case ACTION.MINUS: {
      // 변경된 상태 값 반환
      const { min, step } = action.payload; // { min, step }
      const nextCount = state.count - step;
      return { count: nextCount < min ? min : nextCount };
    }
    default: {
      // 기본 상태 값 반환
      return state;
    }
  }
}

// ----------------------------------------------------------------
// Action 타입에 대해 알아보자!
// - 카운트 증가
// - 카운트 감소
const ACTION = {
  PLUS: '@counter/plus', // 카운트 값 증가
  MINUS: '@counter/minus', // 카운트 값 감소
};

// ----------------------------------------------------------------
// Action Creater
// - 액션을 생성하는 함수
// - 카운트 증가 액션 생성 { type: ACTION.PLUS, payload: { max, step } }
// - 카운트 감소 액션 생성 { type: ACTION.MINUS, payload: { min, step } }
export const plusAction = (step, max) => ({
  type: ACTION.PLUS,
  payload: { step, max },
});
export const minusAction = (step, min) => ({
  type: ACTION.MINUS,
  payload: { step, min },
});
