import { useAsync } from "react-async";
import axios from "axios";

// 프로미스 함수의 파라미터는 객체형태로 받아온다.
async function getUsers({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

// watch : 이전에 deps에 id를 넣은 것과 같은 효과를 내는 것으로, 값이 변경되면 promiseFn을 다시 호출함
function User({ id }) {
  const {
    data: users,
    isLoading: loading,
    error,
  } = useAsync({
    promiseFn: getUsers,
    id,
    watch: id,
  });

  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users) return null;

  return (
    <div>
      <h1>{users.username}</h1>
      <b>Email : </b> {users.email}
    </div>
  );
}

export default User;
