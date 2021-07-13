import { useUserState, useUserDispatch, getUsers } from "./UsersContext";
import { useState, useEffect } from "react";
import User from "./User";

function Users() {
  const { data: users, loading, error } = useUserState().users;
  const dispatch = useUserDispatch();

  const [userId, setUserId] = useState(false);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

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
