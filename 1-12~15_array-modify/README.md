# 1-12~15. 배열 요소의 추가/삭제/수정

> _Reference_ <br> https://react.vlpt.us/basic/12-variable-with-useRef.html <br> https://react.vlpt.us/basic/13-array-insert.html <br> https://react.vlpt.us/basic/15-array-modify.html <br> https://react.vlpt.us/basic/14-array-remove.html <br> https://xiubindev.tistory.com/98

## 📕 주로 배운 내용

- ### 배열을 동적으로 업데이트 하기 위한 준비

  - React 앱에서 배열 요소를 추가하고 이를 렌더링하려면, 배열을 **state 값**으로 설정해주어야 한다. <br> 이는 즉, 배열 업데이트 또한 **불변성**을 지켜 가며 수행해야 됨을 뜻한다. <br> (상태 불변성에 대한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-07_usestate">챕터 1-7</a> 참고)

    ```javascript
    const [users, setUsers] = useState([
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
    ]);
    ```

  - 각 배열 요소의 고유값인 `id`의 경우, ref 변수를 통해 효과적으로 관리할 수 있다. <br> (ref 변수에 대한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-10_useref">챕터 1-10</a> 참고)

    ```javascript
    const nextId = useRef(users.length);
    ```

<br>

- ### 배열 요소 추가 w/불변성

  1.  spread 연산자 활용 : <br> **「기존 state 배열의 내용 + 새로 추가 할 요소」** 로 이루어진 **새 배열**을 state 값으로 지정한다.

      ```javascript
      const user = {
        id: nextId.current,
        username,
        email,
      };
      // 기존 배열의 내용을 복사하고, user 객체를 추가한다.
      setUsers([...users, user]);
      ```

  2.  배열함수 `concat` 활용 : <br> 원하는 요소를 추가한 **새 배열**을 반환하는 **`concat` 배열함수**를 이용한다.

      ```javascript
      const user = {
        id: nextId.current,
        username,
        email,
      };
      // user 객체가 추가 된 배열을 반환한다.
      setUsers(users.concat(user));
      ```

  - 배열 요소를 추가한 후, 다음을 위해 고유값을 의미하는 변수값(`nextId.current`)을 1 증가시켜준다.

    ```javascript
    nextId.current += 1;
    ```

<br>

- ### 배열 요소 삭제 w/불변성

  - 지정한 조건에 부합하는 배열 요소만 추려 **새 배열**로 반환하는 배열함수 `filter`를 활용한다.

    ```javascript
    const onRemove = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };
    ```

<br>

- ### 배열 요소 수정 w/불변성

  - 지정한 함수를 호출한 결과값들을 추려 **새 배열**을 반환하는 배열함수 `map`을 활용한다.

    ```javascript
    const activer = (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    };
    ```
