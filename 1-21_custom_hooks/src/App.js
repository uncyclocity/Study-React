import { useRef, useMemo, useCallback, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

/*
  커스텀 Hooks
  - 비슷한 코드가 반복 될 경우, 로컬 Hooks를 사용하듯 해당 로직도 Hook으로 만들어버릴 수 있다.
  - 보통 use로 시작하는 파일을 만들어 함수를 작성하고, 이를 불러오는 형태이다.
  - 그냥 간단히 다양한 Hooks를 통해 원하는 기능을 구현하고, 사용하고 싶은 값들을 배열로 반환해주도록 만들면 된다.
*/

// 커스텀 Hook을 만들 때에는 보통 여느 Hooks와 같이 use라는 키워드로 시작함
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

function App() {
  /*
    커스텀 Hook인 useInputs()로부터 배열을 받음
    기존의 onChange, onInit 함수를 새 Hook에서 새로 만들었음
  */
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

  const count = useMemo(() => countActiveUsers(state.users), [state.users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onInit={onInit}
      />
      <UserList
        users={state.users}
        onRemove={onRemove}
        activer={activer}
        count={count}
      />
    </>
  );
}

export default App;
