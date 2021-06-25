import { useRef, useState } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "Uncyclocity",
      email: "seongbeom_lee@kakao.com",
    },
    {
      id: 2,
      username: "yoong_kim",
      email: "dl2qja@gmail.com",
    },
    {
      id: 3,
      username: "sblee",
      email: "xuct227@gmail.com",
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

  // .filter 함수 : 함수의 조건에 부합하는 요소를 모아 새 배열로 반환
  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onInit = () => {
    setInputs({
      username: "",
      email: "",
    });
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onInit={onInit}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
