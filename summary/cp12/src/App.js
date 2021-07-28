import { useRef, useState, useMemo } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수 세기 ON");
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

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    setUsers([...users, user]);

    onInit();

    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onInit = () => {
    setInputs({
      username: "",
      email: "",
    });
  };

  const activer = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  /*
    users에 변화가 있을 경우에 필요한 역할을 하지만,
    input 값이 변경되는 등 불필요한 상황에서도 리렌더링으로 인해 호출된다. (onChange() -> setInputs())
    const count = countActiveUsers(users);
  */

  // deps 값의 변화가 없을 경우, 리렌더링 시에도 이전의 값을 재사용한다.
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
