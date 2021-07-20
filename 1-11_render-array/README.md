# 1-11. 배열 렌더링하기

> _Reference_ <br> https://react.vlpt.us/basic/11-render-array.html

## 📕 주로 배운 내용

- ### Q. 아래 컴포넌트의 문제점을 찾으시오 [`null`점]

  ```javascript
  export default function UserList() {
    const users = [
      {
        id: 1,
        username: "uncyclocity",
        email: "seongbeom_lee@kakao.com",
      },
      {
        id: 2,
        username: "yoong_kim",
        email: "dl2qja@gmail.com",
      },
      {
        id: 3,
        username: "sblee",
        email: "xuct227@gmail.com",
      },
    ];

    return (
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
    );
  }
  ```

  #### A. 재사용 가능한 동일한 구조의 코드가 여러 줄에 반복된다.

- ### 해결 방법

  #### **step 1 -** 반복되는 코드를 **별도의 컴포넌트로 분리**한다.

  ```javascript
  // 별도의 컴포넌트로 분리 된 코드
  function User({ user }) {
    return (
      <div>
        <b>{user.username}</b> <span>{user.email}</span>
      </div>
    );
  }

  export default function UserList() {
    const users = [
      {
        id: 1,
        username: "uncyclocity",
        email: "seongbeom_lee@kakao.com",
      },
      {
        id: 2,
        username: "yoong_kim",
        email: "dl2qja@gmail.com",
      },
      {
        id: 3,
        username: "sblee",
        email: "xuct227@gmail.com",
      },
    ];

    return (
      <div>
        {/*
            JSX 코드의 별도 컴포넌트 분리로 한층 깔끔해졌으나,
            아직 비슷한 코드가 반복되고 있다.
          */}
        <User user={user[0]} />
        <User user={user[1]} />
        <User user={user[2]} />
      </div>
    );
  }
  ```

  #### **step 2 -** **배열 내장함수 `map`** 을 이용하여 루프를 돌아, <br> 반복되는 컴포넌트들을 렌더링한다. <br>

  (`Array.prototype.map()`에 대한 설명은 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map">Mozilla Web Docs</a> 참고)

  ```javascript
  // 별도의 컴포넌트로 분리 된 코드
  function User({ user }) {
    return (
      <div>
        <b>{user.username}</b> <span>{user.email}</span>
      </div>
    );
  }

  export default function UserList() {
    const users = [
      {
        id: 1,
        username: "uncyclocity",
        email: "seongbeom_lee@kakao.com",
      },
      {
        id: 2,
        username: "yoong_kim",
        email: "dl2qja@gmail.com",
      },
      {
        id: 3,
        username: "sblee",
        email: "xuct227@gmail.com",
      },
    ];

    return (
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    );
  }
  ```

  - 사실 여기에서도 문제는 존재하는데, 바로 **`key`를 지정하지 않았다는 점이다.** <br> 이는 배열 업데이트의 효율성을 해치는 원인이 되므로 각 원소 당 `key`를 지정해준다.

    ```javascript
    users.map(user =>(
    // key는 각 원소의 고유값으로 지정해야 한다.
    <User user={user} key={user.id}>
    ))
    ```

  - 각 원소의 고유값에 해당하는 값이 없을 경우, `map()` 함수의 두 번째 파라미터로 받을 수 있는 `index`값을 사용해도 된다.

    ```javascript
    users.map((user, index) =>(
    <User user={user} key={index}>
    ))
    ```

<br>

- ### `key` 有無에 따른 업데이트 방식의 차이

  (이미지의 출처는 <a href="https://react.vlpt.us/basic/11-render-array.html">벨로퍼트님 강의</a>입니다. 양질의 강의를 제공해주신 벨로퍼트님께 감사를 표합니다.)

  <br>

  - `key` = ❌

    - **삽입** <br> 중간에 값을 집어넣으면 **뒤의 값들이 차례차례 기존의 앞의 값으로 바뀐다.** <br> ➡ 마지막에 기존의 맨 끝의 값이 새로 삽입된다.

    - **삭제** : <br> 중간에 값을 삭제하면, **삭제한 시점부터 차례차례 기존의 뒤의 값으로 바뀐다.** <br> ➡ 마지막 값이 삭제된다.

    - 이유 : 임시방편으로 **배열 각 요소의 index 값**을 `key`로 사용하기 때문이다.
      ![nokey](https://i.imgur.com/3rkaiY1.gif)

  - `key` = ⭕
    - 기존의 값은 그대로 두고 **원하는 곳에 새로운 값을 삽입**할 수 있다. <br> 👉 `key`를 지정하지 않았을 때에 비해, 한눈에 봐도 효율적이다✨
      ![nokey](https://i.imgur.com/yEUS6Bx.gif)
