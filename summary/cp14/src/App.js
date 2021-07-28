import { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Uncyclocity",
      email: "seongbeom_lee@kakao.com",
      active: true,
    },
    {
      id: 2,
      username: "yoong_kim",
      email: "dl2qja@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "sblee",
      email: "xuct227@gmail.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onInit = useCallback(() => {
    setInputs({
      username: "",
      email: "",
    });
  }, []);

  const onChange = useCallback(
    (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  /*
    함수형 업데이트를 통한 불필요한 리렌더링 방지
    - deps에 users가 들어있기 때문에, users 배열이 바뀔 때마다 해당 함수가 새로 만들어진다.
      => 해당 함수를 참조하는 컴포넌트들이 모두 리렌더링된다.
    - 그렇다면? deps에 users 배열을 넣지 않으면 된다! => 함수형 업데이트를 활용한다.
    - setUsers와 같이 필요한 부분에 콜백 함수를 집어넣어서 파라미터를 users로 하면 된다.
    - deps에 users를 넣지 않고도 setUsers 내부의 콜백함수의 파라미터에서 최신 users의 상태를 참조할 수 있다.
  */

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    /*
      기존처럼 deps에 users를 넣는 경우
      setUsers([...users, user])
    */
    setUsers((users) => users.concat(user));

    onInit();

    nextId.current += 1;
  }, [username, email, onInit]);

  const onRemove = useCallback((id) => {
    /*
      기존처럼 deps에 users를 넣는 경우
      setUsers(users.filter((user) => user.id !== id)
    */
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const activer = useCallback((id) => {
    /*
      기존처럼 deps에 users를 넣는 경우
      setUsers(user.id === id ? { ...user, active: !user.active } : user)
    */
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onInit={onInit}
      />
      <UserList
        users={users}
        onRemove={onRemove}
        activer={activer}
        count={count}
      />
    </>
  );
}

export default App;
