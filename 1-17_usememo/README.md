# 챕터 1-17 : useMemo 를 사용하여 연산한 값 재사용하기

> 참고 : https://react.vlpt.us/basic/17-useMemo.html

#### 📕 주로 배운 내용

- useMemo() 기본 개념
  - 렌더링 시 deps 값의 변화가 없을 경우 이전의 연산 값을 그대로 재사용토록 하는 Hook이다.
  - 렌더링 시의 무지성 재연산을 막기 때문에 성능 최적화에 용이하다.

<br>

- 함수의 형태 : `useMemo(function, [deps])`
  - function : 수행하고자 하는 작업이다.
  - deps : 상태 변경을 검사하고자 하는 특정 값을 넣는 배열이며, 렌더링 이전과 비교하여 상태변경이 감지되면 앞서 지정한 작업을 수행한다.

<br>

- 사용 에시

  - `active` 값이 `true`인 사용자 수를 세어 화면에 렌더링하는 예제

  ##### App.js

  ```{.javascript}
  import { useRef, useState, useMemo } from 'react';
  import UserList from './components/UserList';
  import CreateUser from './components/CreateUser';

  // 예시 함수 : active 값이 true인 사용자 수를 반환하는 함수
  function countActiveUsers(users) {
    console.log('countActiveUsers() 입장');
    return users.filter(user => user.active).length;
  };

  function App() {
    const [users, setUsers] = useState([
      {
        id: 1,
        username: "Uncyclocity",
        email: "seongbeom_lee@kakao.com",
        active: true,
      },
      {
        id: 2,
        username: "yoong_kim",
        email: "dl2qja@gmail.com",
        active: false,
      },
      {
        id: 3,
        username: "sblee",
        email: "xuct227@gmail.com",
        active: false,
      },
    ]);

    ...

    /*
      users의 변화에 따라 필요한 역할을 하는 함수이지만,
      input 값이 변경되는 등의 관련 없는 이유로 인한 렌더링 상황에서도 호출되기에(onChange() -> useUsers())
      성능 효율이 떨어진다.
      const count = countActiveUsers(users);
    */

    // deps 값의 변화가 없을 경우, 리렌더링 시에도 이전에 연산한 값을 재사용한다. => 성능 효율 업
    const count = useMemo(() => countActiveUsers(users), [users]);
  }

  export default App;
  ```
