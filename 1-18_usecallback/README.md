# 챕터 1-18 : useCallback 을 사용하여 함수 재사용하기

> 참고 <br> https://react.vlpt.us/basic/18-useCallback.html <br> https://www.daleseo.com/react-hooks-use-callback/ <br> https://www.zerocho.com/category/React/post/5f98e0ba1d7a110004463b7e <br> https://xiubindev.tistory.com/102

#### 📕 주로 배운 내용

- `useCallback()` 기본 개념
  - `useCallback(function, deps)` = `useMemo(() => function, deps)`이다.
  - deps 배열에 넣은 값의 변경이 이루어 질 경우 함수를 호출하여 연산하며, <u>값이 바뀌지 않을 경우</u> 이전의 연산값을 재사용한다.
  - deps 배열에는 첫 인자로 넣은 함수와 의존성이 있는 props나 상태가 들어간다.
  - **렌더링 시의 무지성 함수 호출을 막는 것**이 목적이며, 눈에 띌 정도는 아니지만 성능 최적화에 어느 정도 도움이 되므로 중요하다.
  - `React.memo`와 함께 사용하면 보다 효과적인 렌더링 성능 최적화가 가능하다. (다음 챕터 참고)

<br>

- `useCallback()`을 꼭 사용하는 경우 : **함수의 얕은 비교**와 관련되어있다.

  - JS에서 함수는 원시 값이 아닌 객체로 취급되며, 객체는 메모리 주소를 일컫는 '참조 값'간의 비교, 즉 <u>얕은 비교</u>가 일어난다. 그러므로 완전 같은 내용이 들어있는 함수를 `===`로 비교해도 참조 값이 다르므로 `false`를 반환한다.

  ```{.javascript}
  const fn1 = () => console.log("안녕");
  const fn2 = () => console.log("안녕");
  console.log(fn1 === fn2);
  결과값 : false
  ```

  1. deps 배열에 함수를 넘길 경우
     렌더링이 될 때마다 함수는 새로 생성되어 새 참조값으로 변경되며, 이는 무한 루프로 이어질 수 있다.
  2. 자식 컴포넌트에 함수를 넘길 경우
     함수 컴포넌트가 실행 될 때마다 함수는 새로 생성되어 새 참조값으로 변경되며, 이는 props가 변경 된 것이기에 해당 컴포넌트가 리렌더링 된다.

     **=> 불필요한 새 함수 생성을 막기 위해 `useCallback()`을 사용한다.**

<br>

- 사용 에시

  ##### App.js

  ```{.javascript}
  import { useRef, useState, useMemo, useCallback } from 'react';
  import UserList from './components/UserList';
  import CreateUser from './components/CreateUser';

  // useMemo() 값 연산용 함수(이전 챕터 참고)
  function countActiveUsers(users) {
    console.log('countActiveUsers() 입장');
    return users.filter(user => user.active).length;
  };

  function App() {

    (일부생략)

    /* onCreate 함수의 useCallback deps에 들어가는 함수이며,
    무한루프를 방지하기 위해 useCallback()을 사용하였다. */
    const onInit = useCallback(() => {
      setInputs({
        username: "",
        email: "",
      });
    }, []);

    /* onChange, onCreate, onRemove, activer 함수는 자식 컴포넌트들의 props에 들어가는 함수이며,
    불필요한 새 함수 생성을 방지하기 위해 useCallback()을 사용하였다. */
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

    // 값을 캐싱하는 useMemo() 함수
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
