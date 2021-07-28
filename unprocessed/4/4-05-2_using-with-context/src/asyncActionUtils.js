// API 처리 함수 반환
export function createAsyncDispatcher(type, promiseFn) {
  const LOADING = `LOADING_${type}`;
  const SUCCESS = `SUCCESS_${type}`;
  const ERROR = `ERROR_${type}`;

  async function actionHandler(dispatch, ...rest) {
    dispatch({ type: LOADING });
    try {
      const data = await promiseFn(...rest);
      dispatch({ type: SUCCESS, data });
    } catch (error) {
      dispatch({ type: ERROR, error });
    }
  }

  return actionHandler;
}

// 초기 상태 객체, 각각 users, user에 들어간다.
export const init_form = {
  loading: false,
  data: null,
  error: null,
};

// 3가지 액션 (시작, 성공, 실패) 객체
const loadingState = {
  ...init_form,
  loading: true,
};
const successState = (data) => ({
  ...init_form,
  data,
});
const errorState = (error) => ({
  ...init_form,
  error,
});

// 리듀서 핸들러(액션 타입을 가져와서 각각 상태를 설정한다.)
export function createAsyncHandler(type) {
  const LOADING = `LOADING_${type}`;
  const SUCCESS = `SUCCESS_${type}`;
  const ERROR = `ERROR_${type}`;

  function reducer(state, action) {
    switch (action.type) {
      case LOADING:
        return {
          ...state,
          [type.toLowerCase()]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [type.toLowerCase()]: successState(action.data),
        };
      case ERROR:
        return {
          ...state,
          [type.toLowerCase()]: errorState(type.error),
        };
      default:
        return state;
    }
  }

  return reducer;
}
