# 챕터 4-03 : useAsync 커스텀 Hook 만들어서 사용하기

> 참고 : https://react.vlpt.us/integrate-api/03-useAsync.html

#### 📕 주로 배운 내용

- 비동기 처리 작업 분리의 중요성

  - <a href="https://github.com/uncyclocity/study_react/tree/main/4-01~02_basic">이전 챕터</a>와 같이 비동기 처리를 분리하지 않는다면?<br>
    👉 API 요청의 종류에 따라 번거롭게 비슷한 코드를 여러 번 작성해야 한다.
  - 코드 반복을 방지하기 위해서라도 비동기 처리를 별도의 Hook로 분리하는 것은 중요하다.
  - 본 챕터에서는 비동기 처리 작업을 수행하기 위한 커스텀 Hook를 직접 제작한다. 커스텀 Hook에 대한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-21_custom-hook">챕터 1-21</a> 참고

<br>

- 예제 코드 : 이전 챕터에서 작성했던 <a href="https://github.com/uncyclocity/study_react/blob/main/4-01~02_basic/src/Users.js">Users.js</a>를 수정하였다.

  ##### `useAsync.js` - API 연동 및 리듀서 담당 커스텀 Hook

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

  // 프로미스 함수는 callback이라는 이름으로 받아준다.
  /* useEffect의 deps를 받는 이유 :
  비동기 함수에서 파라미터가 필요할 때를 대비하여, 파라미터가 바뀔 때 새로운 데이터를 불러오도록 하기 위함이다. */
  function useAsync(callback, deps=[]) {
    const [state, dispatch] = useReducer(reducer, init);

    const fetchUsers = async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await callback();
        dispatch({ type: "SUCCESS", data });
      } catch (e) {
        dispatch({ type: "ERROR", error: e });
      }
    };

    useEffect(() => {
      fetchUsers();
      // 👇 eslint 설정을 다음 줄에서만 비활성화한다.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [state, fetchUsers];
  }

  export default useAsync;
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

  export default Users;
  ```

  - `useEffect`를 이용한 자동 연동의 여부를 제어하기

    ##### `useAsync.js`

    ```
    ...
    functon useAsync(callback, deps=[], skip=true) {
      ...
      useEffect(() => {
        if (skip) return;
        fetchUsers();
        // 👇 eslint 설정을 다음 줄에서만 비활성화한다.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
    }
    ...
    ```

    ##### `Users.js`

    ```
    ...
    function Users() {
      ...
      if (!users) return <button onClick={fetchUsers}>데이터 불러오기</button>;
      ...
    }
    ...
    ```

<br>

- 커스텀 Hook 활용 : URL에 파라미터 붙여서 원하는 데이터만 가져오기

  - URL에 조회를 원하는 데이터를 가리키는 **파라미터**를 붙여 가져올 수 있다.

  - 새 파일에 콜백함수 및 JSX를 작성하고, 실제 API 통신을 담당하는 `useAsync` 커스텀 Hook에 프로미스 함수를 넘겨주어 불러올 수 있다.

  - 예제 코드 : 기존 URL에 고유 id(1)를 붙여 해당 데이터만 불러오기

    ##### `User.js`

    ```
    import axios from "axios";
    import useAsync from "./useAsync";

    async function getUsers(id) {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    }

    function User({ id }) {
      // deps를 지정하는 이유 : 목록에서 다른 항목을 누를 때 마다 id가 변경됨을 감지하여 연동해야 하기 때문
      const [{ users, loading, error }] = useAsync(() => getUser(id), [id]);

      if (loading) return <>로딩중입니다...</>;
      if (error) return <>에러가 발생했습니다.</>;
      if (!users) return null;
      return (
        <div>
          <h1>{users.username}</h1>
          <b>Email : </b>
          {users.email}
        </div>
      );
    }

    export default User;
    ```

    ##### `Users.js` : 리스트에서 클릭 된 항목의 id를 `User`에 넘겨줌

    ```
    import { useState } from "react";
    import axios from "axios";
    import useAsync from "./useAsync";
    import User from "./User";

    async function getUsers() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    }

    function Users() {
      const [{ users, loading, error }, fetchUsers] = useAsync(getUsers);
      const [clicked, setClicked] = useState(false);

      if (loading) return <div>로딩중입니다...</div>;
      if (error) return <div>에러가 발생했습니다.</div>;
      if (!users) return null;
      return (
        <div>
          <ul>
            {users.map(user => (
              <li key={user.id} onClick={() => setClicked(user.id)}>
                {user.username} ({user.name})
              </li>
            ))}
          </ul>
          <button onClick={fetchUsers}>다시 불러오기</button>
          <div>{clicked && <User id={clicked}/>}</div>
        </div>
      );
    }

    export default Users;
    ```
