import { useUserState, useUserDispatch, getUser } from "./UsersContext";
import { useEffect } from "react";

function User({ id }) {
  const { data: users, loading, error } = useUserState().user;
  const dispatch = useUserDispatch();

  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  if (loading) return <>로딩중입니다...</>;
  if (error) return <>에러가 발생했습니다.</>;
  if (!users) return null;
  return (
    <div>
      <h1>{users.username}</h1>
      <b>Email : </b>
      {users.email}
    </div>
  );
}

export default User;
