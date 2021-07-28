# 13. useCallback 을 사용하여 함수 재사용하기

> _References_ <br> https://react.vlpt.us/basic/18-useCallback.html <br> https://www.daleseo.com/react-hooks-use-callback/ <br> https://www.zerocho.com/category/React/post/5f98e0ba1d7a110004463b7e <br> https://xiubindev.tistory.com/102

## 📕 주로 배운 내용

- ### `useCallback()`
  - 리렌더링 시 deps 배열 내부의 값이 변경되지 않으면 **지정한 함수가 새로 만들어지지 않는다.**
  - 리렌더링 이후 무지성 함수 생성을 막는 것을 방지하기에 `useMemo`와 같이 성능 최적화에 용이하다.

<br>

- ### `useCallback` 함수의 구조

  ```javascript
  useCallback(function, deps);
  ```

  - **`function`** : 실행시키려는 함수
  - **`deps`** : 상태 변경을 감지하고자 하는 값 및 **파라미터로 넘겨주는 변수** 등이 들어가는 의존성 배열 <br> 👉 파라미터로 넘겨주는 값을 deps 배열에 넣지 않으면, 해당 값이 최신 값이라는 보장을 할 수 없다.

<br>

- ### `useCallback`와 함수의 얕은 비교

  - JavaScript에서 함수는 원시 값이 아닌 **객체로 취급**되기에, 객체 간 비교는 내용 비교가 아닌 **메모리 주소에 의한 참조 비교**가 일어난다. <br> 👉 이를 **함수의 얕은 비교**라고 부른다.

    **함수의 얕은 비교를 확인하는 예제**

    ```javascript
    const add1 = () => x + y;
    const add2 = () => x + y;

    console.log(add1 === add2);
    ```

    **콘솔 출력 결과**

    ```bash
    false
    ```

  - `useCallback`은 deps 내부의 값이 변경되지 않으면 **메모리 주소**를 그대로 유지한다. <br> 👉 다른 함수의 **deps 배열에 들어가는 함수**의 경우 `useCallback`을 사용하는 편이 좋다. <br> **Q.** 만약 `useCallback`을 사용하지 않은 함수를 deps에 넣는다면? <br> **A.** 리렌더링 될 때마다 deps 배열 내부의 함수(메모리 주소)가 변경됨 ➡ 😱리렌더링 무한 루프😱

<br>

- ### `useCallback` 사용하기

  - `useCallback` 함수를 import 해준다.

    ```javascript
    import React, { useCallback } from "react";
    ```

  - 원하는 **함수**를 넣고, 상태 변경 감지대상인 값을 **deps 배열**에 넣어준다.

    **인자를 넘기지 않을 경우**

    ```javascript
    // item 값 : 값 변경 감지만 필요함
    const exampleFn = useCallback(exampleFn, [item]);
    ```

    **인자를 넘겨 줄 경우 :** 콜백함수 형태로 넣어준다.

    ```javascript
    // item 값 : 값 변경 감지가 필요한 동시에 인자로 넘겨줌
    const exampleFn = useCallback(() => {
      exampleFn(item);
    }, [item]);
    ```

<br>

- ### `useCallback` 예제

  - <a href="https://github.com/uncyclocity/study_react/blob/main/summary/cp12/src/App.js">이전 챕터 App.js</a>의 이벤트 함수들을 수정하였다.

    **`App.js`**

    ```javascript
    const onChange = useCallback(
      (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value,
        });
      },
      [inputs]
    );

    const onCreate = useCallback(() => {
      const user = {
        id: nextId.current,
        username: username,
        email: email,
      };

      setUsers([...users, user]);

      onInit();

      nextId.current += 1;
    }, [username, email, users, onInit]);

    const onRemove = useCallback(
      (id) => {
        setUsers(users.filter((user) => user.id !== id));
      },
      [users]
    );

    const onInit = useCallback(() => {
      setInputs({
        username: "",
        email: "",
      });
    }, []);

    const activer = useCallback(
      (id) => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, active: !user.active } : user
          )
        );
      },
      [users]
    );
    ```
