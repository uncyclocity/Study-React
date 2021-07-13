// 렌더링 부분을 제외한 나머지를 여기로 옮겨서, 커스텀 Hook으로 사용하도록 적용함
import { useEffect, useReducer } from "react";

const init = {
  users: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return {
        users: action.data,
        loading: false,
        error: null,
      };
    case "LOADING":
      return {
        users: null,
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        users: null,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
  }
}

// 파라미터에는 각각 API 요청 함수, useEffect에 쓰이는 deps, useEffect 생략 여부를 넘겨준다.
// deps가 파라미터인 이유 : 비동기 함수에서 파라미터가 필요할 때를 대비하여, 파라미터가 바뀔 때 새로운 데이터를 불러오도록 하기 위함이다.
function useAsync(callBack, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, init);

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      /* API 요청 함수를 분리했어도, 해당 함수가 실행된 뒤 나머지 작업이 수행되어야 하기 때문에
      본 함수 또한 async-await 적용을 유지하였다.*/
      const data = await callBack();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchUsers();
    // 👇 esline 설정을 다음 줄에서만 비활성화한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetchUsers];
}

export default useAsync;
