export function createAsyncDispatcher(type, promiseFn) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({ type: SUCCESS, data });
    } catch (error) {
      dispatch({ type: ERROR, error });
    }
  }

  return actionHandler;
}

export const initialAsyncState = {
  loading: false,
  error: null,
  data: null,
};

const loading_state = {
  loading: true,
  error: null,
  data: null,
};

const error_state = (error) => ({
  loading: false,
  error,
  data: null,
});

const success_state = (data) => ({
  loading: false,
  error: null,
  data,
});

export function createAsyncHandler(type, key) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loading_state,
        };
      case ERROR:
        return {
          ...state,
          [key]: error_state(action.error),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success_state(action.data),
        };
      default:
        return state;
    }
  }

  return handler;
}
