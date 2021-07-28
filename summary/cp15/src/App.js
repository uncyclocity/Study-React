import { useRef, useMemo, useCallback, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

/*
  reducer 함수
  - 현재의 상태와 액션을 받아와서 상태 업데이트를 위한 새로운 상태를 반환한다.
  - useReducer() 함수의 첫 번째 인자로 들어간다.
  - 보통 action.type 값에 따라 상태 반환의 형태를 구분한다.
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
  }
}

/*
  initialState 객체
  - 상태의 초기 형태를 구성한다.
  - useReducer() 함수의 두 번째 인자로 들어간다.
  - 상태가 여러 개일 경우 보통 이렇게 별도의 변수로 분리한다.
*/
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
    useReducer(reducer 함수, 초기 상태)
    - 상태가 많아 복잡해질 경우, 여러 개의 useState() 대신 이를 쓰면 보다 편리한 상태 관리가 가능하다.
    - 상태 업데이트 로직을 분리시킬 수 있다. 컴포넌트 바깥에 작성할 수 있으며 별도의 파일에서 작성하여 불러올 수도 있다.
    - 액션에 따라 새로운 상태를 업데이트하는 reducer 함수, 초기 상태를 정의한 객체가 차례대로 인자로 들어간다.
    - 각각 상태와 디스패치 함수(액션을 발생시킴)를 반환한다. 디스패치 함수를 통해 지정한 액션 객체를 reducer 함수에 보낸 뒤, 새로운 상태로 업데이트시킬 수 있다.
  */
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextId = useRef(4);

  const { username, email } = state.inputs;

  const onInit = useCallback(() => {
    /*
      - 디스패치 함수를 통해 액션 객체를 설정해 주었다.
      - 원하는 변수를 넣어 사용할 수도 있다.
    */
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
