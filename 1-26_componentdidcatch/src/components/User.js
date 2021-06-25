function User({ user }) {
  /*
    Null Checking(빈값 체크)
    받아 온 user이 없을 경우 빈 값을 렌더링한다.
    if (!user) return null;
  */
  return (
    <>
      <div>
        <b>ID</b>: {user.id}
      </div>
      <div>
        <b>Username</b>: {user.username}
      </div>
    </>
  );
}

export default User;
