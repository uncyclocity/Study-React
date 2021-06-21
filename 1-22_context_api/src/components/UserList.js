// useContext Hook와 createContext() 함수가 들어간 변수를 불러온다.
import React, { useContext } from "react";
import { UserDispatch } from "../App";

const User = React.memo(function User({ user }) {
  // useContext : context를 조회하여 값을 변수에 넣어준다.
  const dispatch = useContext(UserDispatch);

  console.log("User() 컴포넌트 입장");
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        // context를 통해 갖고온 디스패치 함수를 사용
        onClick={() => dispatch({ type: "ACTIVER", id: user.id })}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      {/* context를 통해 갖고온 디스패치 함수를 사용 */}
      <button onClick={() => dispatch({ type: "ON_REMOVE", id: user.id })}>
        삭제하즈아
      </button>
    </div>
  );
});

function UserList({ users, count }) {
  return (
    <div>
      {users.map((user) => (
        /*
          - 이전 코드에서는 App 컴포넌트에서 가져 온 함수들을 넘겨줌
          - context API를 사용하면 이전처럼 값을 여러 컴포넌트를 거쳐서 넘겨주지 않아도 된다.
        */
        <User user={user} key={user.id} />
      ))}
      <span>현재 사용자 수 : </span> <b>{count}</b>
    </div>
  );
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
