import axios from "axios";

// 통신을 위한 커스텀 Hook 불러오기
import useAsync from "./useAsync";

// 끝에 id를 붙여서 원하는 데이터 항목을 가져오도록 한다.
async function getUsers(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  // useAsync Hook에 함수를 넘겨 비동기 통신을 실행한다.
  const [{ users, loading, error }] = useAsync(() => getUsers(id), [id]);

  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users) return null;
  return (
    <div>
      <h1>{users.username}</h1>
      <>
        <b>Email : </b>
        {users.email}
      </>
    </div>
  );
}

export default User;
