# 챕터 1-20 : useReducer 를 사용하여 상태 업데이트 로직 분리하기

> 참고 : https://react.vlpt.us/basic/20-useReducer.html

#### 📕 주로 배운 내용

- `useReducer()` 기본 개념
  - 복잡한 상태를 관리할 때 보다 편리한 상태 관리가 가능하다.
  - 상태 업데이트 로직(reducer 함수)를 컴포넌트에서 분리시킬 수 있으며, 아에 별도의 파일로 작성하여 불러올 수도 있다.
  - `useReducer(상태 업데이트 함수, 초기 상태가 담긴 객체)` 형태로 사용가능하다.
  - 상태 객체와 디스패치 함수(액션을 발생시키는 함수)를 반환한다.

<br>

- 사용 예시

  ```{.javascript}
  import React from 'react';

  /*
    reducer 함수
    - 현재의 상태 및 디스패치 함수에서 설정한 액션을 받아옴 -> reducer 함수에 지정한 새로운 상태 객체 반환
    - useReducer() 첫 번째 인자로 들어감
  */
  function reducer(state, action) {
    switch (action.type) {
      case "ON_INIT":
        return {
          users: initialState.users,
          inputs: initialState.inputs,
        };
      case "ON_CHANGE":
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]: action.value,
          },
        };
      case "ON_CREATE":
        return {
          users: state.users.concat(action.user),
          inputs: initialState.inputs,
        };
      case "ON_REMOVE":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.id),
        };
      case "ACTIVER":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.id ? { ...user, active: !user.active } : user
          ),
        };
      default:
        return state;
    };
  }

  // 초기 상태를 정의하는 객체, useReducer() 두 번째 인자로 들어감
  const initialState = {
    users: [
      {
        id: 1,
        username: "Uncyclocity",
        email: "seongbeom_lee@kakao.com",
        active: true,
      },
      {
        id: 2,
        username: "yoong_kim",
        email: "dl2qja@gmail.com",
        active: false,
      },
      {
        id: 3,
        username: "sblee",
        email: "xuct227@gmail.com",
        active: false,
      },
    ],
    inputs: {
      username: "",
      email: "",
    },
  };

  function App() {
    /*
      useReducer()
      - reducer 함수와 초기 상태가 정의된 객체를 인자로 넘긴다.
      - 상태와 디스패치 함수를 받아올 수 있다.
    */
    const [state, dispatch] = useReducer(reducer, initialState);

    const nextId = useRef(4);

    const { username, email } = state.inputs;

    /*
      - 디스패치 함수를 통해 액션 객체를 설정해 주었다.
      - 원하는 변수를 넣어 사용할 수도 있다.
      - 여기서 지정한 action 객체가 넘겨진 reducer 함수가 실행된다.
    */
    const onInit = useCallback(() => {
      dispatch({
        type: "ON_INIT",
      });
    }, []);

    const onChange = useCallback((e) => {
    const name = e.target.name,
      value = e.target.value;

      dispatch({
        type: "ON_CHANGE",
        name,
        value,
      });
    }, []);

    const onCreate = useCallback(() => {
      const user = {
        id: nextId.current,
        username: username,
        email: email,
      };

      dispatch({
        type: "ON_CREATE",
        user,
      });

      nextId.current += 1;
    }, [username, email]);

    const onRemove = useCallback((id) => {
      dispatch({
        type: "ON_REMOVE",
        id,
      });
    }, []);

    const activer = useCallback((id) => {
      dispatch({
        type: "ACTIVER",
        id,
      });
    }, []);

    (내용생략)

  }

  export default UserList;
  ```
