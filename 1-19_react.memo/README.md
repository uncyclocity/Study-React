# 챕터 1-19 : React.memo 를 사용한 컴포넌트 리렌더링 방지

> 참고 <br> https://react.vlpt.us/basic/19-React.memo.html <br> https://xiubindev.tistory.com/103?category=826117 <br> https://ui.toast.com/weekly-pick/ko_20190731

#### 📕 주로 배운 내용

- `React.memo()` 기본 개념
  - <u>props가 바뀌지 않은 컴포넌트</u>의 불필요한 리렌더링을 방지하는 함수이다.
  - 컴포넌트 함수를 `React.memo()` 함수 내부에 감싸는것 만으로도 사용이 가능하다.
  - `React.memo()` 함수는 기본적으로 **얕은 비교**(메모리 주소 참조값 비교)를 한다.

<br>

- 사용 예시

  ```{.javascript}
  import React from 'react';

  // 함수를 변수로 설정해주면 React.memo로 감쌀 수 있다.
  const User = React.memo(function User({ user, onRemove, activer }) {

    (내용생략)

  });

  function UserList({ users, onRemove, activer, count }) {

    (내용생략)

  }

  // export 코드에서 해당 함수를 감싸준다.
  export default React.memo(UserList);
  ```

<br>

- `React.memo(component, areEqual)`

  - 비교 방식을 수정하고 싶을 경우, 두 번째 파라미터에 원하는 비교함수를 넣어줄 수 있다.

    ```{.javascript}
      // 이전 users와 현재 users가 같다면 true를 반환한다.
      export default React.memo(
        UserList,
        (prevProps, nextProps) => prevProps.users === nextProps.users
      )
    ```

  <br>

- (번외)함수형 업데이트를 통한 불필요한 렌더링 방지

  - deps 배열의 값이 바뀌면, 해당 deps를 참고하고 있는 함수들이 재생성된다.
    -> 해당 함수를 참조하는 컴포넌트들의 props가 변경되는 것이므로, 리렌더링이 진행된다.

  - 함수형 업데이트는 deps에 넣지 않고 <u>해당 Hook에 콜백 함수를 집어넣은 뒤 파라미터에 참조값을 넘겨</u> 값을 업데이트함으로써 최신 값을 참조할 수 있도록 한다
    **=> deps에 값을 넣지 않으므로 불필요한 리렌더링을 방지할 수 있다.**

<br>

- 사용 예시

  ```{.javascript}
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    /*
      기존처럼 deps에 users를 넣는 경우
      setUsers([...users, user])
    */
    setUsers((users) => users.concat(user));

    onInit();

    nextId.current += 1;
  }, [username, email, onInit]);
  ```

  ```{.javascript}
  const onRemove = useCallback((id) => {
    /*
      기존처럼 deps에 users를 넣는 경우
      setUsers(users.filter((user) => user.id !== id)
    */
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);
  ```
