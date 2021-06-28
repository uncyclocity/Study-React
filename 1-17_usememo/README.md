# 챕터 1-17 : useMemo 를 사용하여 연산한 값 재사용하기

> 참고 <br> https://react.vlpt.us/basic/17-useMemo.html <br> https://xiubindev.tistory.com/101

#### 📕 주로 배운 내용

- `useMemo()` 기본 개념
  - 렌더링 시 `deps` 값 변화가 없을 경우, **이전의 연산 값을 그대로 재사용**토록 하는 Hook이다.
  - 기존의 연산 값을 재사용함으로서 렌더링 시의 무지성 값 재연산을 막기 때문에 성능 최적화에 용이하다.

<br>

- 함수의 형태 : `useMemo(function, deps)`
  - `function` : 수행시키려는 작업
  - `deps` : 상태 변경을 검사하고자 하는 특정 값들이 들어가는 배열

<br>

- 사용하기

  ```
  import React, { useMemo } from "react";
  ```

  ```
  const [item1, setItem1] = useState(false),
        [item2, setItem2] = useState(false);

  useMemo(() => console.log("item1 값 " + item1 + "로 변경됨"), [item1]);
  useMemo(() => console.log("item2 값 " + item2 + "로 변경됨"), [item2]);

  setItem1(true);
  setItem2(true);
  ```

  **result**

  ```
  item1 값 true로 변경됨
  item2 값 true로 변경됨
  ```

<br>

- 사용 예시 : `active = true`인 users의 요소의 수를 화면에 띄우는 예제

  ##### App.js

  ```
  import { useRef, useState, useMemo } from 'react';
  (코드생략...)

  // useMemo에 의해, users 값이 변경되면 실행되는 함수
  function countActiveUsers(users) {
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

    (코드 생략...)

    // users 값의 변경에 따라 countActiveUsers 함수가 실행되고, 반환 값을 count에 넘겨 줌
    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
      <>
        (코드 생략...)
        <div>활성 사용자 수 : {count}</div>
      </>
    )
  }

  export default App;
  ```
