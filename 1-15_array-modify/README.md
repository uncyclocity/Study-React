# 챕터 1-15 : 배열에 항목 수정하기

> 참고 : https://react.vlpt.us/basic/15-array-modify.html

#### 📕 주로 배운 내용

- (번외)조건부 스타일링

  - **삼항 연산자**나, **논리 연산자**를 활용할 수 있다.
  - 사용 예시 : props로 받아 온 `user.active` 값의 T/F에 따른 글자색 설정

    ```
    return (
      <div>
        <b
          style={{
          cursor: 'pointer',

          // 삼항 연산자 활용
          color: user.active ? 'green' : 'black'
          }}
        >
          {user.username}
        </b>
      </div>
    )
    ```

    ```
    return (
      <div>
        <b
          style={{
          cursor: 'pointer',

          // 논리 연산자 활용
          color: user.active && 'green'
          }}
        >
          {user.username}
        </b>
      </div>
    )
    ```

<br>

- 배열 항목 수정하기 : **지정한 함수를 호출한 결과값들을 모아 새 배열을 반환하는 `map()` 배열함수**를 활용할 수 있다.

  ```
  const onToggle = id => {
    setUsers(
        /*
          - 받아온 id 값과 매칭되면 active 값을 반전한 객체를 추가, 아니면 그냥 추가
          - 삼항 연산자를 이용함
        */
        users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }
  ```
