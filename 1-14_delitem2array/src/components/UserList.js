function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      {/* 
        JSX 외부의 함수에 파라미터를 넘기려면 화살표 함수를 사용하여야 한다.
        onClick={onRemove(user.id)}을 해버리면 렌더링과 동시에 함수가 실행되어 아무것도 렌더링 되지 않을 것
      */}
      <button onClick={() => onRemove(user.id)}>삭제하즈아</button>
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default UserList;
