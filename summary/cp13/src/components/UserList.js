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
      {/* JSX 외부의 함수에 파라미터를 넘기려면 화살표 함수를 사용하여야 한다. */}
      <button onClick={() => onRemove(user.id)}>삭제하즈아</button>
    </div>
  );
}

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

export default UserList;
