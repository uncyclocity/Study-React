# 챕터 4-04 : react-async 로 요청 상태 관리하기

> 참고 : https://react.vlpt.us/integrate-api/04-react-async.html

#### 📕 주로 배운 내용

- react-async 기본 개념

  - 이전 챕터에서 만든 <a href="https://github.com/uncyclocity/study_react/blob/main/4-03_useasync/src/useAsync.js">useAsync</a> 와 비슷한 역할을 하는 함수가 들어 있는 라이브러리
  - 커스텀 Hook을 제작하는 것이 번거로울 경우 이를 사용해도 좋으나, 약간의 사용법 차이가 존재한다.

<br>

- 시작하기

  - 서드파티 라이브러리이므로 설치하여 import 해준다.

    ```
    $ yarn add react-async
    ```

    ```
    import { useAsync } from "react-async";
    ```

<br>

- 예시로 보는 `useAsync` 기본 가이드

  ```
  // id는 임의의 값이며, 사용자가 값을 언제든지 바꿀 수 있다는 가정을 두고 있다.
  const { data, isLoading, error, reload } = useAsync({ promiseFn, id, watch: id });
  ```

  - 여느 Hook과는 달리, 상태를 배열이 아닌 객체로 반환한다.
  - 상태는 각각 `data` / `isLoading` / `error` 셋을 받아온다.<br>
    👉 각각의 의미 : 프로미스의 데이터 / 현재 로딩 여부 / 에러 정보
  - 프로미스 함수가 들어가는 요소는 두 가지가 있으며, 각 경우에 따라 알맞게 사용할 수 있는 데이터 로드 함수가 있다.
    - `promiseFn` : 렌더링 시 자동 로드 ➡ 데이터 재로드를 위해서는 `reload` 함수 사용
    - `deferFn` : 렌더링 시 자동 로드되지 않음 ➡ 데이터 로드를 위해서는 `run` 함수 사용
  - 프로미스 함수의 파라미터는 객체 형태로 해주어야 한다.
    ```
    async function getUser({ id }) {...}
    ```
  - 특정 값이 바뀔 때 마다 프로미스 함수를 호출하려면 `watch`에 값을 넣어준다.

<br>

- 사용 예시 : 이전 챕터에서 작성한 <a href="https://github.com/uncyclocity/study_react/blob/main/4-03_useasync/src/Users.js">Users.js</a>와 <a href="https://github.com/uncyclocity/study_react/blob/main/4-03_useasync/src/User.js">User.js</a>에 react-async 적용하기

  ##### `Users.js`

  ```
  import { useState } from "react";
  import axios from "axios";
  import { useAsync } from "react-async"
  import User from "./User";

  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }

  function Users() {
    const [clicked, setClicked] = useState(false);

    const {
      data: users,
      isLoading: loading,
      error,
      reload: fetchUsers
    } = useAsync({
      promiseFn: getUsers
    });

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

  ##### `User.js`

  ```
  import axios from "axios";
  import { useAsync } from "react-async";

  async function getUsers({ id }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  }

  function User({ id }) {
    const {
      data: users,
      isLoading: loading,
      error
    } = useAsync({
      promiseFn: getUsers,
      id,
      watch: id
    });

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
