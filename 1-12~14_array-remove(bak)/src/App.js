import { useRef, useState } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

function App() {
  // 배열 값 변경 시 렌더링을 위해 상태값으로 설정 해 주었다.
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

  /* 배열 요소를 추가 시 id값으로 쓰일 ref이며,
    nextId.current로 현재 값을 불러올 수 있다. */
  const nextId = useRef(4);

  // 인풋 값의 상태이며, 배열에 추가 할 객체의 요소 값으로 사용된다.
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  /* 인풋 값이 바뀜 -> spread operator을 통해 기존 값을 복붙함 ->
    현재 이벤트가 일어난 DOM(e.target)의 name값과 같은 key 값의 value 요소를 바꿈 */
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  /* username, email 상태값을 가져와서 새 객체를 만듦 ->
    이를 추가한 객체를 users 상태로 지정(UserList 렌더링) -> 
    input 값들을 빈 값으로 바꿈(CreateUser 렌더링) ->
    차후 id 값으로 사용 될 nextId의 값을 +1함 */
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
    // 각각 유저 추가 컴포넌트, 배열 값 띄우는 컴포넌트
    <>
      <CreateUser
        // 유저네임과 이메일 상태 값 전달
        username={username}
        email={email}
        // input 입력 값 변경 시 동작 함수, 새 요소 집어넣기 함수 전달
        onChange={onChange}
        onCreate={onCreate}
        onInit={onInit}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
