import { useRef, useMemo, useCallback, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

function reducer (state, action) {
  switch(action.type) {
    case "ON_INIT":
      return {
        users: initialState.users,
        inputs: initialState.inputs
      };
    case "ON_CHANGE":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case "ON_CREATE":
      return {
        users: state.users.concat(action.user),
        inputs: initialState.inputs
      };
    case "ON_REMOVE":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    case "ACTIVER":
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? { ...user, active: !user.active } : user)
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
    }
  ],
  inputs: {
    username: "",
    email: "",
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextId = useRef(4);

  const { username, email } = state.inputs;

  const onInit = useCallback(() => {
    dispatch({
      type: "ON_INIT"
    });
  }, []);

  const onChange = useCallback(
    (e) => {
      const name = e.target.name,
            value = e.target.value;

      dispatch({
        type: "ON_CHANGE",
        name,
        value
      });
    },
    []
  );

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    dispatch({
      type: "ON_CREATE",
      user
    })

    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "ON_REMOVE",
      id
    });
  }, []);

  const activer = useCallback((id) => {
    dispatch({
      type: "ACTIVER",
      id
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
