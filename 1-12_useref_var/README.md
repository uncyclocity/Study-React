# 챕터 1-12 & 1-13

## useRef로 컴포넌트 안의 변수 만들고 배열에 항목 추가하기

> 참고 <br> https://react.vlpt.us/basic/12-variable-with-useRef.html <br> https://react.vlpt.us/basic/13-array-insert.html

#### 📕 주로 배운 내용

- useRef의 두 기능
  - 특정 DOM을 선택하기
  - **컴포넌트 안에서 조회 및 수정이 자유자재로 가능한 변수 만들기**

<br>

- useRef로 관리하는 변수의 특징

  - 값이 바뀌어도 리렌더링 되지 않음
  - 렌더링 없이도 바로 변수값을 조회할 수 있다.
  - `.current`로 현재 값을 받을 수 있다. 따라서 수정할 때도 `.current` 값을 수정하면 되고 조회할 때도 `.current` 값을 조회하면 된다.

  ##### 조회

  ```{.javascript}
  const num = useRef(0)
  ...
  return <div>{num.current}</div>
  // 0이 화면에 띄워짐
  ```

  ##### 수정

  ```{.javascript}
  const num = useRef(0)
  ...
  num.current += 1;
  return <div>{num.current}</div>
  // 1이 화면에 띄워짐
  ```

<br>

- 배열에 항목 추가 및 렌더링

  - 배열의 변경 내용을 렌더링하려면, 배열을 useState로 관리해주어야 한다.

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

  - spread operator을 이용한 배열 추가

  ```{.javascript}
  const user = {
    id: nextId.current,
    username,
    email
  };
  setUsers([...users, user]);
  ```

  - concat 함수를 이용한 배열 추가 : 새 배열을 반환하는 함수이기에 가능

  ```{.javascript}
  const user = {
    id: nextId.current,
    username,
    email
  };
  setUsers(users.concat(user));
  ```
