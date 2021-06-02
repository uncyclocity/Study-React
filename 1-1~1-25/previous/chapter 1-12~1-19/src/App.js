import {useRef, useState, useMemo, useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

// onCallback 같은 경우는, 함수 안에서 사용하는 상태나 props(함수포함)가 있다면 deps 배열에 포함시켜야함
// 그렇지 않으면 해당 값들의 가장 최신 값을 참조 할 것이라 보장할 수 없음
// 다만, useState로 관리하는 값의 경우 함수형 업데이트를 쓰면 파라미터를 통해 최신 users 값을 참고할 수 있음
function App() {
  // CreateUser의 입력값에 해당하는 상태들을 초기화
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  // inputs의 각각의 값이 배열 비구조화 할당을 통해 각 변수에 들어감
  const {username, email} = inputs;

  // 입력 값이 바뀐 경우 상태 변경
  // + 렌더링 수를 줄이기 위해 deps에 useState로 관리하는 input을 지우고, 함수형 업데이트로 조치해 주었다.
  // deps 값 변경이 확인되면 비동기적인 문제를 해결하기 위해 리렌더링을 진행하는데, 함수형 업데이트는 리렌더링 없이 항상 최신상태로 유지할 수 있음
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  // 배열의 상태를 초기화
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
    }
  ]);

  // useRef를 사용할 때 파라미터를 넣어 줄 경우, 파라미터 값이 .current의 기본 값이 된다.
  // 값을 수정할 때는 .current 값을 수정, 조회 할 때도 .current 값을 조회하면 됨
  const nextId = useRef(4);

  // 등록 버튼을 눌렀을 때 실행될 함수
  const onCreate = useCallback(() => {
    // onChange 함수를 통해 변경된 상태값이 들어간다
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 배열 상태 변경
    // ...(spread operator)을 쓰는 이유
    // setUsers는 이전 객체와 얕은 비교(참조값에 의한 비교)를 실시하는데, 
    // 값을 바꾸더라도 참조 값은 달라지지 않기에 같은 객체로 인식한다.
    // 따라서, 기존 객체(리터럴) 및 배열의 각 요소만 가져오는 spread operator을 사용하여 기존 객체의 요소들만 가져온 다음, 새로운 임의의 값을 넣어 새 객체를 만들어준다.
    setUsers(users => ([...users, user]));

    // 인풋 상태 빈 값으로 초기화
    setInputs({
      username: '',
      email: ''
    });

    // nextId 변수 +1
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    // Array.prototype.filter()를 이용하여
    // 테스트를 통과하는 배열의 요소만 쭈압쭈압 뽑아서 새 배열로 반환함
    setUsers(users => (users.filter(user => user.id !== id)));
  }, []
  );

  // 해당 id와 맞는 요소의 user.active 값을 반전시킨 배열을 반환하여 상태를 바꾼다.
  const onToggle = useCallback(id => {
    setUsers(users => (
      users.map(user =>
        user.id === id ? {...user, active: !user.active} : user
      )
    ));
  }, []
  );

  // useMemo(연산 정의 함수, deps)
  // deps 배열 안의 내용이 바뀌면 첫번째 파라미터에 등록한 함수를 호출하여 값을 연산함
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser 
        onChange={onChange}
        onCreate={onCreate}
        username={username}
        email={email}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자수 = {count}</div>
    </>
  );
}

export default App;