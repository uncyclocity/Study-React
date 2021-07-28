import React from "react";

// React.memo로 감쌈으로써 컴포넌트 성능 최적화 작업을 해주었다.
const User = React.memo(function User({ user, onRemove, activer }) {
  // 컴포넌트 리렌더링을 확인하기 위함
  console.log("User() 컴포넌트 입장");
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => activer(user.id)}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제하즈아</button>
    </div>
  );
});

function UserList({ users, onRemove, activer, count }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} activer={activer} />
      ))}
      <span>현재 사용자 수 : </span> <b>{count}</b>
    </div>
  );
}

// React.memo로 감쌈으로써 컴포넌트 성능 최적화 작업을 해주었다.
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
