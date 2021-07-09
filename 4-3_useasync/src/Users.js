// 비동기 통신 및 상태 관리를 별도의 커스텀 Hook으로 분리함
import useAsync from "./useAsync";
import User from "./User";
import axios from "axios";
import { useState } from "react";

// API 요청을 별도의 함수로 분리
async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(false);

  // 통신 상태에 따른 state와, 버튼 이벤트로 등록 할 함수를 받아온다.
  // 파라미터에는 각각 API 요청 시작 함수, useEffect에 쓰이는 deps, useEffect 생략 여부를 넘겨준다.
  const [{ users, loading, error }, fetchUsers] = useAsync(getUsers, [], true);

  // User 컴포넌트에서는 JSX 코드 부분만 남겨놓음
  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users) return <button onClick={fetchUsers}>불러오기</button>;
  return (
    <div>
      <ul>
        {users.map((user) => (
          // 누르면 userId 상태값으로 지정됨 -> User 컴포넌트 렌더링 내용이 보여짐
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
