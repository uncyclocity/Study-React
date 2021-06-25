# 챕터 1-12 & 1-13

## useRef로 컴포넌트 안의 변수 만들고 배열에 항목 추가하기

> 참고 <br> https://react.vlpt.us/basic/12-variable-with-useRef.html <br> https://react.vlpt.us/basic/13-array-insert.html <br> https://xiubindev.tistory.com/98

#### 📕 주로 배운 내용

- `useRef`의 두 기능
  - <a href="https://github.com/uncyclocity/study_react/tree/main/1-10_useref">특정 DOM을 선택하는 객체 만들기</a>
  - **컴포넌트 안에서 조회 및 수정이 가능한 변수 만들기**

<br>

- `useRef` 객체로 관리하는 변수의 특징

  - 상태와는 달리 값이 업데이트 되어도 리렌더링 되지 않는다.
  - 상태와는 달리 리렌더링 없이도 업데이트 된 변수값을 조회할 수 있다.
  - `.current`로 현재 값을 받을 수 있다. 따라서 수정할 때도 `.current` 값을 수정하면 되고 조회할 때도 `.current` 값을 조회하면 된다.<br>
    (참고 : `useRef` 객체의 값을 특정 DOM으로 설정했을 경우, `.current`는 해당 DOM을 가리킨다.)

- 사용하기

  ```{.javascript}
  import React, { useRef } from "react";
  ```

  ##### 조회

  ```{.javascript}
  // 초기화 값을 인자로 넣어준다.
  const num = useRef(0)
  (코드생략...)
  return <div>{num.current}</div>
  // 0이 화면에 띄워짐
  ```

  ##### 수정

  ```{.javascript}
  const num = useRef(0)
  (코드생략...)
  num.current += 1;
  return <div>{num.current}</div>
  // 1이 화면에 띄워짐
  ```

<br>

- 배열에 항목 추가 및 렌더링

  - 배열의 변경 내용을 렌더링하려면, 배열을 상태값으로써 관리해주어야 한다.

    ```{.javascript}
    const [users, setUsers] = useState([
      {
        id: 1,
        username: 'uncyclocity',
        email: 'seongbeom_lee@kakao.com'
      },
      {
        id: 2,
        username: 'yoong_kim',
        email: 'dl2qja@gmail.com'
      },
      {
        id: 3,
        username: 'sblee',
        email: 'xuct227@gmail.com'
      }
    ]);
    ```

  - spread 연산자를 이용한 배열 추가

    ```{.javascript}
    const user = {
      /*
        useRef로 관리받는 변수를 고유값으로 지정해 주었다.
        배열의 요소가 추가될 때 마다 1씩 증가시킨다.
      */
      id: nextId.current,
      username,
      email
    };
    // 기존 배열의 내용을 복사하고, user 객체를 추가한다.
    setUsers([...users, user]);
    ```

  - 원하는 요소를 추가한 새 배열을 반환하는 `concat()` 배열함수를 이용한 배열 추가

    ```{.javascript}
    const user = {
      id: nextId.current,
      username,
      email
    };
    // user 객체가 추가 된 배열을 반환한다.
    setUsers(users.concat(user));
    ```
