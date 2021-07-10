import { useEffect, useReducer } from "react";
import axios from "axios";

/*
  axios
  - REST API를 호출할 수 있는 라이브러리
  - GET/POST/PUT/DELETE 등의 메서드로 API와 연동할 수 있다.
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

  // useEffect의 첫 파라미터에 넘겨주는 함수 = async 사용 불가 => 이를 사용하는 새로운 함수를 선언하여 불러와야 함
  const fetchUsers = async () => {
    // 로딩중 상태로 변경
    dispatch({ type: "LOADING" });
    try {
      // api 연동 시도
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      // 실패 시 에러를 띄움
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
