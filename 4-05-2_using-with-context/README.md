# 챕터 4-05 : Context 와 함께 사용하기(2)

> 참고 : https://react.vlpt.us/integrate-api/05-using-with-context.html

#### 📕 주로 배운 내용

- 함수화를 통한 로직 반복 최소화

  - <a href="https://github.com/uncyclocity/study_react/tree/main/4-05-1_using-with_context">챕터 4-05-1</a>의 코드는 정석적인 「API 연동 × Context」 패턴이라고 할 수 있지만, 반복되는 로직의 존재로 인해 눈쌀이 찌푸려질 수 있었다.<br>
    👉 `UsersContext.js`의 리듀서, API 연동/처리 로직이 이에 해당한다.
  - 반복되는 로직을 함수화하게 되면, 재활용이 수월해지기에 비슷한 코드의 반복을 최소화할 수 있다.

<br>

- **첫 번째** - API 연동 및 처리 로직의 함수화

  - users / user에 따라 다른 주소와 액션 타입을 넣어주는데, 비슷한 구조가 반복되고 있다.

    ##### `UsersContext.js` 中 80~102줄

    ```
    export async function getUsers(dispatch) {
      dispatch({ type: "LOADING_USERS" });
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({ type: "SUCCESS_USERS", data: response.data });
      } catch (error) {
        dispatch({ type: "ERROR_USERS", error });
      }
    }

    export async function getUser(dispatch, id) {
      dispatch({ type: "LOADING_USER" });
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        dispatch({ type: "SUCCESS_USER", data: response.data });
      } catch (error) {
        dispatch({ type: "ERROR_USER", error });
      }
    }
    ```

  - 이는 「프로미스 함수 / 처리 로직」 으로 나눌 수 있다.

    ##### `api.js` : `users` / `user` 프로미스 함수

    ```
    import axios from "axios";

    export async function getUsers() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    }

    export async function getUser(id) {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    }
    ```

    ##### `asyncActionUtils.js` : API 처리 로직을 반환함

    ```
    // 각각 users/user, 프로미스 함수를 넘겨줌 ➡ 맞춤형 API 처리 로직을 반환함
    export async function createAsyncDispatcher(type, promiseFn) {
      // 디스패치에 넣어 줄 액션타입을, 받아 온 type에 따라 지정함
      const LOADING = `LOADING_${type}`;
      const SUCCESS = `SUCCESS_${type}`;
      const ERROR = `ERROR_${type}`;

      async function actionHandler(dispatch, ...rest) {
        dispatch({ type: LOADING });
        try {
          const data = await promiseFn(...rest);
          dispatch({ type: SUCCESS, data });
        } catch (error) {
          dispatch({ type: ERROR, error });
        }
      }

      return actionHandler;
    }
    ```

  - 함수 사용하기

    ```
    import { createAsyncDispatcher } from "./asyncActionUtils"

    // api 파일 내부 中 export하는 객체 전체를 「api」 객체에 넣어준다는 의미이다.
    import * as api from "./api"
    ```

    ```
    // 액션 타입 지정을 위한 "USERS"/"USER" 문자열 및 프로미스 함수를 넘겨준다.
    // 각각 맞춤형 API 연동 및 처리 함수가 반환된다.
    const getUsers = createAsyncDispatcher("USERS", api.getUsers);
    const getUser = createAsyncDispatcher("USER", api.getUser);
    ```

    ```
    getUsers(dispatch);
    ```

    ```
    getUser(dispatch, id);
    ```

- **두 번째** - 리듀서의 함수화

  - 리듀서 함수에서 `users` / `user` 둘을 구분짓기 위해 비슷한 코드를 반복한 것을 볼 수 있다.

    ##### `UsersContext.js` 中 30 ~ 65줄

    ```
    function reducer(state, action) {
      switch (action.type) {
        case "SUCCESS_USERS":
          return {
            ...state,
            users: success_state(action.data),
          };
        case "LOADING_USERS":
          return {
            ...state,
            users: loading_state,
          };
        case "ERROR_USERS":
          return {
            ...state,
            users: error_state(action.error),
          };
        case "SUCCESS_USER":
          return {
            ...state,
            user: success_state(action.data),
          };
        case "LOADING_USER":
          return {
            ...state,
            user: loading_state,
          };
        case "ERROR_USER":
          return {
            ...state,
            user: error_state(action.error),
          };
        default:
          throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
      }
    }
    ```

  - state의 초기 상태 및 loading/success/error 상태를 정의하는 객체, 리듀서 부분을 별도의 오브젝트로 분리하여 리팩토링을 진행할 수 있다.

    ##### `asyncActionUtils.js`

    ```
    (createAsyncDispatcher 함수 생략...)

    // users, user의 초기 값으로 지정해야 하므로 export 해줌
    export const initForm = {
      loading: false,
      data: null,
      error: null
    };

    // 3가지 액션 (시작, 성공, 실패) 객체
    const loadingState = {
      ...initForm,
      loading: true
    };
    const successState = (data) => ({
      ...initForm,
      data
    });
    const errorState = (error) => ({
      ...initForm,
      error
    });

    // "USERS", "USER" 문자열을 받아 액션 타입을 지정하고, 각 액션 타입에 따라 객체를 리턴하는 reducer 함수를 반환한다.
    export function createAsyncHandler(type) {
      const LOADING = `LOADING_${type}`;
      const SUCCESS = `SUCCESS_${type}`;
      const ERROR = `ERROR_${type}`;

      function reducer(state, action) {
        switch(action.type) {
          case LOADING:
            return {
              ...state,
              [type.toLowerCase()]: loadingState
            };
          case SUCCESS:
            return {
              ...state,
              [type.toLowerCase()]: successState
            };
          case ERROR:
            return {
              ...state,
              [type.toLowerCase()]: errorState
            }
          default:
            return state;
        }
      }

      return reducer;
    }
    ```

  - 함수 사용하기

    - 초기 State 값 설정

      ```
      import { initState } from "./asyncActionUtils";
      ```

      ```
      const init = {
        users: initState,
        user: initState
      };

      const [state, dispatch] = useReducer(reducer, init);
      ```

    - 리듀서 사용하기

      ```
      import { createAsyncHandler } from "./asyncActionUtils";
      ```

      ```
      // users/user 맞춤형 객체를 반환하도록 지정해준다.
      const usersHandler = createAsyncHandler("USERS");
      const userHandler = createAsyncHandler("USER");

      ...

      // reducer에서 users/user로 거른다. ➡ 리듀서 핸들러에서 액션 타입에 따라 반환된다.
      function reducer(state, action) {
        switch (action.type) {
          case "SUCCESS_USERS":
          case "LOADING_USERS":
          case "ERROR_USERS":
            return usersHandler(state, action);
          case "SUCCESS_USERS":
          case "LOADING_USERS":
          case "ERROR_USERS":
            return userHandler(state, action);
          default:
            throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
        }
      }
      ```
