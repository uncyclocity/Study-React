# 챕터 4-05 : Context 와 함께 사용하기

> 참고 : https://react.vlpt.us/integrate-api/05-using-with-context.html

#### 📕 주로 배운 내용

- API 연동 시 Context를 사용하면?

  - 여러 컴포넌트에 걸쳐서 사용하는 데이터가 있을 경우, Context를 사용하면 좋다.<br>
    👉 예 : 사용자 프로필, 설정 값 등...
  - Context에 대한 자세한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-22_context-dispatch">챕터 1-22</a> 참고

<br>

- 「API 연동 × Context」 예제 코드

  - <a href="https://github.com/uncyclocity/study_react/tree/main/4-03_useasync/src">챕터 4-03의 코드</a>를 수정하였습니다.
  - 기존 `useAsync` Hook의 기능을 `UserContext.js`에 통합하였습니다.
  - 아래와 같이, `Users`와 `User`에서 사용되는 값들을 하나의 `state` 객체에 집어넣었습니다.

    ```
    state = {
      users: {
        data: null,
        loading: false,
        error: null
      }
      user: {
        data: null,
        loading: false,
        error: null
      }
    }
    ```

  ##### `UserContext.js`

  ```
  import { useReducer, createContext, useContext } from "react";
  import axios from "axios";

  // 각 키값이 될 초기 상태를 정의하는 객체
  const init_form = {
    data: null,
    loading: false,
    error: null
  };

  // useReducer 함수에 파라미터로 넘겨 줄 「초기 상태」
  const init = {
    users: init_form,
    user: init_form
  };

  // 로딩 상태 객체
  const loading_form = {
    ...init_form,
    loading: true
  };

  // API 연동 성공 시 상태 객체
  const success_form = data => ({
    ...init_form,
    data
  });

  // API 연동 에러 시 상태 객체
  const error_form = error => ({
    ...init_form,
    error
  });

  // 리듀서 액션 타입은 users/user 및 각 상태에 따라 정의되어 있다.
  function reducer(state, action) {
    switch(action.type) {
      case "LOADING_USERS":
        return {
          ...state,
          users: loading_form
        };
      case "SUCCESS_USERS":
        return {
          ...state,
          users: success_form(action.data)
        };
      case "ERROR_USERS":
        return {
          ...state,
          users: error_form(action.error)
        };
      case "LOADING_USER":
        return {
          ...state,
          user: loading_form
        };
      case "SUCCESS_USER":
        return {
          ...state,
          user: success_form(action.data)
        };
      case "ERROR_USER":
        return {
          ...state,
          user: error_form(action.error)
        };
      default:
        throw new Error(`${action.type} 액션 타입은 정의되지 않았습니다.`);
    }
  }

  // state와 dispatch를 다른 컴포넌트에 넘겨주기 위해 컨텍스트 두개를 생성함
  export const UserStateContext = createContext(null);
  export const UserDispatchContext = createContext(null);

  export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, init);

    return (
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    );
  }

  // API 연동 및 처리 - users
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

  // API 연동 및 처리 - user
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

  // useContext 대신 해주는 커스텀 Hook - state
  export function useUserState() {
    const state = useContext(UserStateContext);
    if(!state) throw new Error("Provider를 찾을 수 없습니다.");
    return state;
  }

  // useContext 대신 해주는 커스텀 Hook - dispatch
  export function useUserDispatch() {
    const dispatch = useContext(UserDispatchContext);
    if(!dispatch) throw new Error("Provider를 찾을 수 없습니다.");
    return dispatch;
  }
  ```

  ##### `Users.js`

  ```
  import { useUserState, useUserDispatch, getUsers } from "./UsersContext";
  import { useState } from "react";
  import User from "./User";

  function Users() {
    const { loading, error, data: users } = useUserState();
    const dispatch = useUserDispatch();

    const [userId, setUserId] = useState(false);

    useEffect(() => {
      getUsers(dispatch);
    }, [dispatch]);

    if (loading) return <>로딩중입니다...</>;
    if (error) return <>에러가 발생했습니다.</>;
    if (!users) return <button onClick={() => getUsers(dispatch)}>불러오기</button>;
    return (
      <div>
        <ul>
          {users.map((user) => (
            // 누르면 userId 상태값으로 지정됨 -> User 컴포넌트 렌더링 내용이 보여짐
            <li
              key={user.id}
              onClick={() => setUserId(user.id)}
              style={{ cursor: "pointer" }}
            >
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={() => getUsers(dispatch)}>새로 고침</button>
        <div>{userId && <User id={userId} />}</div>
      </div>
    );
  }

  export default Users;
  ```
