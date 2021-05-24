import {useRef} from 'react';
import UserList from './UserList';

function App() {
  const users = [
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
  ];

  // useRef를 사용할 때 파라미터를 넣어 줄 경우, 파라미터 값이 .current의 기본 값이 된다.
  // 값을 수정할 때는 .current 값을 수정, 조회 할 때도 .current 값을 조회하면 됨
  const nextId = useRef(4);
  const onCreate = () => {
    // 배열 값 추가하는 로직을 여기에 입력
    nextId.current += 1;
  }

  return (
    <UserList users={users}/>
  );
}

export default App;
