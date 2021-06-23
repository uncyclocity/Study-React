import React, { useMemo, useReducer } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

/*
  immer 기본 개념
  - 상태의 불변성을 자동으로 지켜주는 라이브러리
  - 기존에는 .map(), .concat(), .filter() 와 같은 새 배열을 반환하는 함수를 사용하여 불변성을 지켜주었음
    => immer을 사용할 경우 개발자는 .push(), .splice() 등의 함수를 이용하여
       상태를 수정하기만 해도 알아서 불변성을 지켜준다.
  - 편한 만큼 코드가 약간 느려지는데다가, 오히려 코드가 복잡해지는 경우가 있으므로 기호에 맞게 사용하는 편이 좋다.
  - 설치를 진행한 다음, 아래와 같이 produce 함수를 불러와 사용한다.
*/
import produce from "immer";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

/*
  - produce(업데이트하려는 상태, (첫번째 인자의 상태 복사본) => {상태를 바꾸는 함수}) : 새로운 상태를 반환함
  - produce((업데이트하려는 상태의 복사본) => {상태를 바꾸는 함수}) : 상태룰 업데이트하는 함수를 반환함
*/
function reducer(state, action) {
  switch (action.type) {
    case "ON_CREATE":
      // return {
      //   users: state.users.concat(action.user),
      // };
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "ON_REMOVE":
      // return {
      //   users: state.users.filter((user) => user.id !== action.id),
      // };
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    case "ACTIVER":
      // return {
      //   users: state.users.map((user) =>
      //     user.id === action.id ? { ...user, active: !user.active } : user
      //   ),
      // };
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
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

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const count = useMemo(() => countActiveUsers(state.users), [state.users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={state.users} count={count} />
    </UserDispatch.Provider>
  );
}

export default App;
