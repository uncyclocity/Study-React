# 12. useMemo 를 사용하여 연산한 값 재사용하기

> _References_ <br> https://react.vlpt.us/basic/17-useMemo.html <br> https://xiubindev.tistory.com/101

## 📕 주로 배운 내용

- ### `useMemo()`
  - 리렌더링 시 deps 배열 내부의 값에 변화가 없을 경우 **콜백 함수를 부르지 않도록 하는 Hook**이다. <br> 👉 `useMemo` 콜백 함수에서 연산되는 값 또한 **재연산 없이 그대로 유지된다.**
  - 리렌더링 이후 무지성 값 재연산을 방지하기에 성능 최적화에 용이하다.

<br>

- ### `useMemo` 함수의 구조

  ```javascript
  useMemo(function, deps)
  ```

  - **`function`** : 실행시키려는 콜백 함수
  - **`deps`** : 상태 변경을 감지하고자 하는 값이 들어가는 의존성 배열

<br>

- ### `useMemo` 사용하기

  - `useMemo` 함수를 import 해준다.

    ```javascript
    import React, { useMemo } from "react";
    ```

  - 원하는 연산을 수행하는 **콜백함수**를 넣고, 상태 변경 감지대상인 값을 **deps 배열**에 넣어준다.

    ```javascript
    const [item1, setItem1] = useState(false),
      [item2, setItem2] = useState(false);

    // 렌더링에 따라 item1/item2 상태 변경 순서를 결정하는 useRef 변수
    const endCount = useRef(0);

    useMemo(
      () =>
        console.log("(endCount = " + endCount.current + ") item1 = " + item1),
      [item1]
    );
    useMemo(
      () =>
        console.log("(endCount = " + endCount.current + ") item2 = " + item2),
      [item2]
    );

    // 상태 변경 순서 : item1 ➡ item2
    switch (endCount.current) {
      case 0:
        setItem1(true);
        endCount.current += 1;
        break;
      case 1:
        setItem2(true);
        endCount.current += 1;
        break;
      default:
        return null;
    }
    ```

    **콘솔 출력 결과** <br> 첫 렌더링 시 두 콘솔 모두 출력 ➡ 두 번째 렌더링 시 item1 값 콘솔만 출력 ➡ 세 번째 렌더링 시 item2 값 콘솔 출력

    ```bash
    (endCount = 0) item1 = false
    (endCount = 0) item2 = false
    (endCount = 1) item1 = true
    (endCount = 2) item2 = true
    ```

<br>

- ### `useMemo` 예제

  - `users` 각 배열 내부에서 `active` 키값이 `true`인 객체 개수를 화면에 띄우는 예제

    **`App.js`**

    ```javascript
    import { useRef, useState, useMemo } from "react";

    // useMemo 콜백함수에서 users 값이 변경되면 실행되는 함수
    // active = true인 객체 수를 반환함
    function countActiveUsers(users) {
      return users.filter((user) => user.active).length;
    }

    export default function App() {
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

      // deps 배열 내부의 users 값이 변경됨
      // ➡ countActiveUsers 함수가 실행되어 active = true인 객체 수를 반환
      // ➡ 반환 값을 count 변수에 넘겨 줌
      const count = useMemo(() => countActiveUsers(users), [users]);

      return <div>활성 사용자 수 : {count}</div>;
    }
    ```
