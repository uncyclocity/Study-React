import React, { useRef, useMemo, useCallback, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import useInputs from "./hooks/useInputs";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

function reducer(state, action) {
  switch (action.type) {
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
  }
}

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
};

/*
  Context API
  - 지정한 범위 내의 컴포넌트에서 전역적으로 특정 값을 사용하거나 관리할 수 있도록 해주는 리액트 내장 API
  - 특정 값을 최종 목적지인 컴포넌트에게 전달하기 위해서 여러 컴포넌트를 거치는 복잡한 상황을 방지하기 위해 필요하다.
  - 함수, 상태, DOM 등 어떠한 값도 넘겨줄 수 있으며, useReducer()의 디스패치 함수를 넘겨겨주어 다른 컴포넌트에서 사용할 수도 있다.

  본 예제는 useReducer()의 디스패치 함수를 넘겨주는 코드이다.
*/

// 변수에 createContext() 함수를 담는다. 인자에는 해당 context의 기본값을 준다.
export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, onInit] = useInputs({
    username: "",
    email: "",
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const nextId = useRef(4);

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

  const count = useMemo(() => countActiveUsers(state.users), [state.users]);

  return (
    /*
      - context가_담긴_변수이름.Provider는 컴포넌트 이름이며, 이를 통해 context의 값을 지정할 수 있다.
      - 값을 정할 때는 value에 설정해준다.
      - 이 컴포넌트 태그가 감싼 범위 내에서 지정한 값을 사용할 수 있다.
    */
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onInit={onInit}
      />
      {/*
        이전 코드에서는 디스패치 함수를 호출하는 onRemove, Activer 함수를 넘겨주었었다.
      */}
      <UserList users={state.users} count={count} />
    </UserDispatch.Provider>
  );
}

export default App;
