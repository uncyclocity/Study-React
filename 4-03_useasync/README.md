# 챕터 4-03 : useAsync 커스텀 Hook 만들어서 사용하기

> 참고 : https://react.vlpt.us/integrate-api/03-useAsync.html

#### 📕 주로 배운 내용

- API 연동의 커스텀 Hook 化가 중요한 이유

  - 비동기 통신 작업을 커스텀 Hook으로 작성하지 않게 된다면?<br>
    👉 API 요청의 종류에 따라 번거롭게 비슷한 코드를 여러 번 작성해야 한다.
  - 코드 반복을 방지하기 위해서라도 비동기 통신을 커스텀 Hook으로 분리하는 것은 중요하다.
  - 커스텀 Hook에 대한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-21_custom-hook">챕터 1-21</a> 참고

<br>

- 예제 코드 : 챕터 4-1에서 작성했던 <a href="https://github.com/uncyclocity/study_react/blob/main/4-1_basic/src/Users.js">Users.js</a>를 수정하였다.

  ##### `useAsync.js`

  ```
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
        throw new Error(`'{action.type}'은 명시되지 않은 타입입니다.`);
    }
  }

  // API 요청의 함수는 요청 대상이 일정하지 않기에, callBack이라는 이름으로 받아준다.
  /* useEffect의 deps를 받는 이유 :
  비동기 함수에서 파라미터가 필요할 때를 대비하여, 파라미터가 바뀔 때 새로운 데이터를 불러오도록 하기 위함이다. */
  function useAsync(callBack, deps=[]) {
    const [state, dispatch] = useReducer(reducer, init);

    const fetchUsers = async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await callBack();
        dispatch({ type: "SUCCESS", data });
      } catch (e) {
        dispatch({ type: "ERROR", error: e });
      }
    };

    useEffect(() => {
      // 👇 esline 설정을 다음 줄에서만 비활성화한다.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchUsers();
    }, deps);

    return [state, fetchUsers];
  }
  ```

  ##### `Users.js`

  ```
  import axios from "axios";
  import useAsync from "./useAsync";

  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }

  function Users() {
    const [{ users, loading, error }, fetchUsers] = useAsync(getUsers);

    if (loading) return <div>로딩중입니다...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!users) return null;
    return (
      <>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
      <>
    );
  }
  ```

> ⚒ 작업 중 ⚒
