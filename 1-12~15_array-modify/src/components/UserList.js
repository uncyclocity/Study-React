function User({ user, onRemove, activer }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          // 삼항 연산을 이용한 조건부 스타일 렌더링
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
}

function UserList({ users, onRemove, activer }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} activer={activer} />
      ))}
    </div>
  );
}

export default UserList;
