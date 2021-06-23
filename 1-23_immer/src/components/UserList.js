import React, { useContext } from "react";
import { UserDispatch } from "../App";

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch);
  console.log("User() 컴포넌트 입장");
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => dispatch({ type: "ACTIVER", id: user.id })}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
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
