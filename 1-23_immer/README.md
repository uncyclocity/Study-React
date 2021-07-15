# 챕터 1-23 : Immer 를 사용한 더 쉬운 불변성 관리

> 참고 <br> https://react.vlpt.us/basic/23-immer.html <br> https://xiubindev.tistory.com/106

#### 📕 주로 배운 내용

- immer 기본 개념
  - **자동으로 상태의 불변성을 관리**해주는 라이브러리이다. 이를 사용하면 개발자는 불변성을 신경 쓰지 않아도 된다.
  - 상태를 일부 수정하더라도 자동으로 새 상태를 만들어 지정해준다. 따라서 `push()`, `splice()`와 같이 배열의 일부분을 변경하는 함수 또한 물론 사용 가능하다.
  - 기본적으로 immer을 사용하지 않을 경우의 코드의 성능이 약간 더 좋은 편이다.<br>
    👉 데이터의 구조가 복잡할 경우에만 사용하도록 하자.

<br>

- 시작하기

  - 서드파티 라이브러리이므로 별도로 설치해주어야 한다.

    ```
    $ yarn add immer
    ```

  - `produce` 함수를 불러온다.

    ```{.javascript}
    import produce from "immer";
    ```

<br>

- `produce()` 함수의 두 가지 사용법

  - 원하는 상태 값을 업데이트하기

    ```
    produce(state, draft => {/*상태를 설정하는 로직*/});
    ```

    - `state` : 업데이트 하고자 하는 상태
    - `draft` : `state`의 복사본
    - 사용 예시(`App.js`의 상태 변경 로직 함수 `reducer()`)
      ```
      function reducer(state, action) {
        switch(action.type){
          case "ON_CREATE":
            // Non-Immer code
            // retutn {
            //   users: state.users.concat(action.user)
            // };
            return produce(state, draft => {
              draft.users.push(action.user);
            });
          case "ON_REMOVE":
            // Non-Immer code
            // return {
            //   users: state.users.filter(user => user.id === action.id)
            // };
            return produce(state, draft => {
              const index = draft.users.findIndex(user => user.id === action.id);
              draft.users.splice(index, 1);
            })
          case "ACTIVER":
            // Non-Immer code
            // return{
            //   users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : user
            // };
            return produce(state, draft => {
              const user = draft.users.find(user => user.id === action.id);
              user.active = !user.active;
            });
        }
      }
      ```
      - `ACTIVER`와 같이, 불변성을 지키지 않으면 오히려 복잡해지는 경우는 사용하지 않는 편이 좋다.

  - `useState()` setter 함수의 함수형 업데이트에 사용하기

    ```
    const sample = produce(draft => {/*상태를 설정하는 로직*/});
    setState(sample);
    ```

    - 상태를 넣어주지 않고 바로 콜백함수를 넘겨주는 형태이다.
    - `draft`에 setter 함수가 가리키는 상태값이 자동으로 들어간다.
    - 사용 예시

      ```
      const [todo, setTodo] = useState(
        {
          title: "아무것도안한다",
          isDone: false
        }
      );

      const setDone = useCallback(() => {
        setTodo(produce(draft => {
          draft.isDone = !draft.isDone;
        }));
      }, []);
      ```
