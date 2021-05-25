import {useRef, useState} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  // CreateUser의 입력값에 해당하는 상태들을 초기화
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  // inputs의 각각의 값이 배열 비구조화 할당을 통해 각 변수에 들어감
  const {username, email} = inputs;

  // 입력 값이 바뀐 경우 상태 변경
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  // 배열의 상태를 초기화
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com'
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
    }
  ]);

  // useRef를 사용할 때 파라미터를 넣어 줄 경우, 파라미터 값이 .current의 기본 값이 된다.
  // 값을 수정할 때는 .current 값을 수정, 조회 할 때도 .current 값을 조회하면 됨
  const nextId = useRef(4);

  // 등록 버튼을 눌렀을 때 실행될 함수
  const onCreate = () => {
    // onChange 함수를 통해 변경된 상태값이 들어간다
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 배열 상태 변경
    setUsers([...users, user]);

    // 인풋 상태 빈 값으로 초기화
    setInputs({
      username: '',
      email: ''
    });

    // nextId 변수 +1
    nextId.current += 1;
  };

  return (
    <>
      <CreateUser 
        onChange={onChange}
        onCreate={onCreate}
        username={username}
        email={email}
      />
      <UserList users={users}/>
    </>
  );
}

export default App;
