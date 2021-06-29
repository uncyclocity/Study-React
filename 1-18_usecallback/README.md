# 챕터 1-18 : useCallback 을 사용하여 함수 재사용하기

> 참고 <br> https://react.vlpt.us/basic/18-useCallback.html <br> https://www.daleseo.com/react-hooks-use-callback/ <br> https://www.zerocho.com/category/React/post/5f98e0ba1d7a110004463b7e <br> https://xiubindev.tistory.com/102

#### 📕 주로 배운 내용

- `useCallback()` 기본 개념
  - `useCallback(function, deps)` = `useMemo(() => function, deps)`이다.
  - `deps` 배열에는 첫 인자로 넣은 함수와 의존성이 있는 props나 상태가 들어간다.
  - **렌더링 시의 무지성 함수 호출을 막는 것**이 목적이며, 눈에 띌 정도는 아니지만 성능 최적화에 어느 정도 도움이 되므로 중요하다.

<br>

- `useCallback()`을 꼭 사용하는 경우 : **함수의 얕은 비교**와 관련되어있다.

  - JavaScript에서 함수는 원시 값이 아닌 객체로 취급되며, 객체 간 비교는 내용이 아닌 **참조값**으로 비교한다.

  1. `deps` 배열에 함수를 넘길 경우 : 렌더링 될 때마다 `deps` 배열 내부의 상태가 변경됨 -> 리렌더링의 늪
  2. 자식 컴포넌트에 함수를 넘길 경우 : 렌더링 될 때마다 자식 컴포넌트의 props가 변경됨 -> 리렌더링의 늪

     **👉 불필요한 새 함수 생성으로 인한 리렌더링의 늪을 막기 위해 `useCallback()`을 사용한다.**

<br>

- 사용하기

  ```
  import React, { useCallback } from "react";
  ```

  ```
  const [item, setItem] = setItem(0);

  const example = useCallback(() => {
    // deps와 의존성이 있는 로직
    setItem(item + 1);
  }, [item]);

  ...

  /*
    리렌더링 시, example 함수의 deps 배열 내 값이 업데이트가 되지 않았다면 이전 연산값을 재사용함
    👉 불필요한 함수 생성을 막기에, 아래의 작업들에 있어 리렌더링의 늪을 방지하고 성능을 최적화함
  */
  return <Component example={ example }/>
  useEffect(() => {/* deps값 변경 시 작업 */}, [example]);
  ```

<br>

- 사용 에시

  ##### App.js

  ```
  import { useRef, useState, useMemo, useCallback } from 'react';
  import UserList from './components/UserList';
  import CreateUser from './components/CreateUser';

  // useMemo() 값 연산용 함수(이전 챕터 참고)
  function countActiveUsers(users) {
    console.log('countActiveUsers() 입장');
    return users.filter(user => user.active).length;
  };

  function App() {
    (일부 생략...)
    // onInit : onCreate 함수 useCallback의 deps에 들어가는 함수
    const onInit = useCallback(() => {
      setInputs({
        username: "",
        email: "",
      });
    }, []);

    // onChange~activer : 자식 컴포넌트들의 props에 들어가는 함수
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

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
          onInit={onInit}
        />
        <UserList
          users={users}
          onRemove={onRemove}
          activer={activer}
          count={count}
        />
      </>
    );
  }

  export default App;
  ```
