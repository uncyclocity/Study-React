import { useRef, useState, useMemo, useCallback } from "react";
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

  /*
    useCallback() Hooks 개념
    - useCallback(function, deps) = useMemo(() => function, deps) 이다. 즉, 함수를 캐싱하는 Hook이다.
    - deps 배열에 넣은 값의 변경이 이루어 질 경우 함수를 호출하여 연산하며, 값이 바뀌지 않을 경우 이전의 연산값을 재사용한다.
    - deps 배열에는 첫 인자로 넣은 함수와 의존성이 있는 props나 상태가 들어간다.
    - 렌더링 시의 무지성 함수 재호출을 막기 때문에 컴포넌트 성능 최적화에 용이하다.
    - React.memo()와 함께 사용하면 자식 컴포넌트의 불필요한 렌더링을 줄일 수 있다. 이에 대한 내용은 다음 챕터에...
    
    사용하는 경우 : 두 경우 모두 JS 함수 동등성 문제와 관련되어 있다.
    
    1. 자식 컴포넌트로 함수를 넘겨줄 때
    - 자식 컴포넌트로 함수를 넘겨 줄 경우 컴포넌트가 실행 될 때마다 같은 내용의 새로운 함수가 생성되며, 이 경우 prop이 바뀌는 것이므로 리렌더링이 진행된다.
    => 이 경우 불필요한 새 함수 생성을 막기 위해 useCallback()을 사용하여야 한다.
    
    2. deps 배열로 함수를 넘겨줄 때
    - deps 배열에 함수를 넣게 될 경우, 렌더링 시 계속 다른 함수로 인식하게 되어 무한루프에 빠지게 된다.
    => 이 경우 다시 렌더링 되더라도 참조 값을 동일하게 유지시키기 위해 useCallback()을 사용한다.
  */

  /* onCreate 함수의 useCallback deps에 들어가는 함수이며,
  무한루프를 방지하기 위해 useCallback()을 사용하였다. */
  const onInit = useCallback(() => {
    setInputs({
      username: "",
      email: "",
    });
  }, []);

  /* onChange, onCreate, onRemove, activer 함수는 자식 컴포넌트 props에 들어가는 함수이며,
  불필요한 새 함수 생성을 방지하기 위해 useCallback()을 사용하였다. */
  const onChange = useCallback(
    (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    setUsers([...users, user]);

    onInit();

    nextId.current += 1;
  }, [username, email, users, onInit]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const activer = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );

  // 값을 캐싱하는 useMemo() 함수
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
