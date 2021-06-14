# 챕터 1-11 : 배열 렌더링하기

> 참고 : https://react.vlpt.us/basic/11-render-array.html

#### 📕 주로 배운 내용

- 재사용 가능한 코드를 일일이 반복하는 것 = 영 좋지 않음

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
      // 반복 가능한 코드를 일일이 쓰고 있다. 우엑;;
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

<br>

- 화면에 띄우기 위한 JSX 코드가 정리 된 컴포넌트 별도 선언

  - 한 파일 내에 여러 개의 컴포넌트를 선언해도 된다.

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
        <User user={user} key={user.id} />
      </div>
    )
  }

  export default UserList;
  ```

<br>

- key 존재 유무의 차이

  - key 없이 렌더링 할 경우, 중간에 값을 집어넣으면 뒤의 값들이 차례차례 기존의 앞의 값으로 바뀐 다음 마지막에 기존의 맨 끝의 값이 새로 삽입된다.
    ![nokey](https://i.imgur.com/3rkaiY1.gif)

  - key가 있을 경우, 보다 효율적이게도 기존의 값은 그대로 두고 원하는 곳에 새로운 값을 삽입할 수 있다.
    ![nokey](https://i.imgur.com/yEUS6Bx.gif)
