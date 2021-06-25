# 챕터 1-11 : 배열 렌더링하기

> 참고 : https://react.vlpt.us/basic/11-render-array.html

#### 📕 주로 배운 내용

- 아래 코드의 문제점

  ##### UserList.js
  
    ```{.javascript}
    function UserList() {
      const users = [
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
      ];

      return (
        // 재사용 가능한 코드를 일일히 넣어주고 있다.
        <>
          <div>
            <b>{users[0].username}</b> <span>({users[0].email})</span>
          </div>
          <div>
            <b>{users[1].username}</b> <span>({users[1].email})</span>
          </div>
          <div>
            <b>{users[2].username}</b> <span>({users[2].email})</span>
          </div>
        </>
      )
    }

    export default UserList;
    ```

  - 재사용 가능한 동일한 구조의 코드가 여러 줄에 반복된다.<br>
  - 해결 방법
    1. 해당 코드를 별도의 컴포넌트로 분리한다.
    2. 배열 내장함수 `map()`을 이용하여 리엑트 엘리먼트로 이루어진 배열로 반환받아 렌더링한다.
    
<br>

- 첫 번째 - 반복되는 JSX 코드가 정리 된 컴포넌트 별도 선언

  - 별도의 컴포넌트 파일 분리 없이, **한 파일 내에 복수의 컴포넌트**를 선언해도 된다.

    ##### UserList.js

    ```{.javascript}
    /*
      - 반복되던 JSX 코드의 반환만을 위한 별도의 컴포넌트 `User`를 한 파일 내에 선언해주었다.
      - UserList 컴포넌트에서 users 배열의 각 객체가 차례로 User 컴포넌트의 props로 넘겨진다.
    */
    function User({ user }) {
      return (
        <div>
          <b>{user.username}</b> <span>{user.email}</span>
        </div>
      )
    }

    function UserList() {
      const users = [
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
      ];

      return(
        <div>
          {/* 
            JSX 코드의 별도 컴포넌트 분리로 한층 깔끔해졌으나,
            아직 비슷한 코드가 반복되고 있다.
          */}
          <User user={user[0]} />
          <User user={user[1]} />
          <User user={user[2]} />
        </div>
      )
    }

    export default UserList;
    ```

<br>

- 두 번째 - 배열 내장함수 `map()`을 이용하기

  - `map()` 함수는 배열안의 각 원소를 지정한 함수를 통해 변환하여, 새로운 배열로 만들어준다.
  - 일반 데이터 배열인 `users`를, 루프를 돌아서 `User` 컴포넌트를 통해 **리액트 엘리먼트로 이루어진 배열**로 반환받아준다.

    ```{.javascript}
    function User({ user }) {
      return (
        <div>
          <b>{user.username}</b> <span>{user.email}</span>
        </div>
      )
    }

    function UserList() {
      const users = [
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
      ];

      return(
        <div>
          {/* map() 함수를 통해 users 배열의 각 원소를 넘겨주고 있다. */}
          {users.map(user => (
            <User user={user} />
          ))}
        </div>
      )
    }

    export default UserList;
    ```
    
  - 위의 코드 그대로 렌더링할 경우, `key`라는 props를 지정하지 않음으로 인한 콘솔 에러를 볼 수 있다.
    => 배열을 렌더링할 때는 **각 원소 당 `key` props**를 지정해야 한다.
    
    ```{.javascript}
    users.map(user => (
      /*
        user.id 값을 키로 지정해주었다. 
        key는 이름에서 보았듯 각 원소의 고유값으로 지정해주어야 한다.
      */
      <User user={user} key={user.id} />
    ))
    ```
    
  - 만약 각 원소 당 고유값이 없을 경우, `map()` 함수의 콜백 함수 두 번째 파라미터의 `index`를 `key`로 사용할 수 있다.
    ```{.javascript}
    users.map((user, index) => (
      <User user={user} key={index} />
    ))
    ```

<br>

- `key` props 존재 유무에 따른 업데이트 방식의 차이

  - `key` 없이 렌더링 할 경우, 중간에 값을 집어넣으면 뒤의 값들이 차례차례 기존의 앞의 값으로 바뀐 다음<br>
    마지막에 기존의 맨 끝의 값이 새로 삽입된다.<br>
    => 배열 각 요소의 **인덱스 값**을 `key`로 사용하기 때문이다.
    ![nokey](https://i.imgur.com/3rkaiY1.gif)

  - key가 있을 경우, 보다 효율적이게도 기존의 값은 그대로 두고 원하는 곳에 새로운 값을 삽입할 수 있다!
    ![nokey](https://i.imgur.com/yEUS6Bx.gif)
