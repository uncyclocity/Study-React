# 챕터 1-23 : Immer 를 사용한 더 쉬운 불변성 관리

> 참고 <br> https://react.vlpt.us/basic/23-immer.html <br> https://xiubindev.tistory.com/106

#### 📕 주로 배운 내용

- immer 기본 개념
  - 자동으로 상태의 불변성을 관리해주는 <u>라이브러리</u>이다.
  - 기존에는 spread 연산자, 새로운 배열을 반환하는 함수(예를 들어 `map()`나 `filter()` 같은 것들)등을 통해 불변성을 지켜주었어야 했다.
    => immer을 사용하면 상태의 일부를 수정하는 코드를 작성하는 등 **불변성을 신경 쓰지 않더라도 자동으로 불변성이 관리된다.**
  - `push()`, `splice()`와 같이 배열의 일부분을 변경하는 함수 또한 물론 사용 가능하다.
  - 기본적으로 immer을 사용하지 않을 경우의 코드의 성능이 약간 더 좋은 편이다.

<br>

- immer 사용하기

  - 외부 라이브러리이므로 별도로 설치해주어야 한다.

    ```
    $ yarn add immer
    ```

  - immer로부터 produce 함수를 불러온다.

    ```{.javascript}
    import produce from "immer";
    ```

  - produce 함수의 사용법

    - 원하는 상태를 지정하여, 변경 된 상태를 리턴받기

      ```{.javascript}
      produce(state, draft => {/*상태를 설정하는 로직*/})
      ```

      state : 설정하고자 하는 상태
      draft : 첫 번째 인자로 지정한 설정하고자 하는 상태의 복사본이 <u>자동으로 들어감</u>

      ##### 사용 예시 (App.js)

      ```{.javascript}
      (코드생략)
      function reducer(state, action) {
        switch (action.type) {
          case "ON_CREATE":

            /*
              이전 코드
              return {
                users: state.users.concat(action.user),
              };
            */

            return produce(state, (draft) => {
              draft.users.push(action.user);
            });
          case "ON_REMOVE":

            /*
              이전 코드
              return {
                users: state.users.filter((user) => user.id !== action.id),
              };

              이전 코드보다 복잡해 진 경우이므로, 이런 경우에는 바닐라JS로만 구현하는 것이 좋다.
            */

            return produce(state, (draft) => {
              const index = draft.users.findIndex((user) => user.id === action.id);
              draft.users.splice(index, 1);
            });
          case "ACTIVER":

            /*
              이전 코드
              return {
                users: state.users.map((user) =>
                  user.id === action.id ? { ...user, active: !user.active } : user
                ),
              };
            */

            return produce(state, (draft) => {
              const user = draft.users.find((user) => user.id === action.id);
              user.active = !user.active;
            });
          default:
            return state;
        }
      }
      (코드생략)
      ```

    <br>

    - 상태를 변경하는 함수를 리턴받기

      ```{.javascript}
      produce(draft => {/*상태를 설정하는 로직*/})
      ```

      draft : 설정하고자 하는 상태의 복사본이 자동으로 들어감

      ##### 사용 예시

      ```{.javascript}
      const [todo, setTodo] = useState({
        title: "끝내주게 숨쉬기",
        done: false
      });

      // draft에 현재 상태(todo)가 자동으로 들어감 => 함수형 업데이트 방식인 것이다.
      const onClick = useCallback(() => {
        setTodo(produce(draft => {
          draft.done = !draft.done;
        }));
      });
      ```
