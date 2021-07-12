// 기존에 작성하던 커스텀 Hook, react-async 라이브러리로 대체되었다.
import { useAsync } from "react-async";
import { useState } from "react";
import User from "./User";
import axios from "axios";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(false);

  // reac-async/useAsync 함수는 상태를 배열이 아닌 객체로 반환한다.
  // promiseFn-reload : 렌더링 시 자동로드 - 재로드함수
  // deferFn-run : 렌더링 시 자동로드 X - 로드함수
  const {
    data: users,
    isLoading: loading,
    error,
    run: fetchUsers,
  } = useAsync({
    deferFn: getUsers,
  });

  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users) return <button onClick={fetchUsers}>불러오기</button>;

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
      <button onClick={fetchUsers}>새로 고침</button>
      <div>{userId && <User id={userId} />}</div>
    </div>
  );
}

export default Users;
