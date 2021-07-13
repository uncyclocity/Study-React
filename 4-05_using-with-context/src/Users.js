import { useUserState, useUserDispatch, getUsers } from "./UsersContext";
import User from "./User";
import { useState } from "react";

function Users() {
  const [userId, setUserId] = useState(false);

  const { loading, error, data: users } = useUserState().users;
  const dispatch = useUserDispatch();

  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users)
    return <button onClick={() => getUsers(dispatch)}>불러오기</button>;
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={() => getUsers(dispatch)}>새로 고침</button>
      <div>{userId && <User id={userId} />}</div>
    </div>
  );
}

export default Users;
