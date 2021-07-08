import { useEffect, useReducer } from "react";
import axios from "axios";

/*
  axios
  - REST API를 호출할 수 있는 라이브러리
  - GET/POST/PUT/DELETE 등의 메서드로 API를 요청할 수 있다.
*/

const init = {
  users: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return {
        users: action.data,
        loading: false,
        error: null,
      };
    case "LOADING":
      return {
        users: null,
        loading: true,
        error: null,
      };
    case "ERROR":
      return {
        users: null,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error(`'{action.type}'은 명시되지 않은 타입입니다.`);
  }
}

function Users() {
  const [{ users, loading, error }, dispatch] = useReducer(reducer, init);

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  // 첫 마운트 시 API 불러오기 시도
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중입니다...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Users;
