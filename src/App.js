/*
useReducer : useState의 확장판
- 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리할 수 있음(initialize 객체, reducer 함수)
ㄴ 바깥에, 별도 파일에 작성해서 불러올 수 있다
- 관리하는 상태 값이 여러개이고 구조가 복잡하다면 useState 대신 쓰면 편하다
- setter를 여러 번 써야 한다면 이를 쓰는 것이 편할 수 있다
ㄴ 예)useState Hook을 사용하면서 setUsers와 setInputs가 동시에 쓰임
  => initialize에 한번에 초기화, reducer 함수 하나로 type 값에 따른 값 변경
*/
import {useReducer, useRef, useMemo, useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

// hooks 폴더에 생성한 커스텀 hooks 호출
import useInputs from './hooks/useInputs'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

// useReducer에 사용되는 상태들을 초기화
const initialize = {
  users: [
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
  ]
};

// dispatch 함수 안의 객체 요소를 action.객체요소명 형식으로 불러올 수 있음
// state.state객체 형식으로 각 state객체를 불러올 수 있음
function reducer(state, action) {
  switch(action.type) {
    case "CREATE_USER":
      return {
        users: [...state.users, action.user],
      };
    case "REMOVE_USER":
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    case "TOGGLE_USER":
      return {
        users: state.users.map(user => 
          user.id === action.id ? {...user, active: !user.active} : user
        )
      };
    default:
      return state;
  }
}

function App() {
  // 커스텀 Hooks 사용
  const [{username, email}, onChange, reset] = useInputs({
    username: '',
    email: ''
  });

  const [state, dispatch] = useReducer(reducer, initialize);
  const {users} = state;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onRemove = useCallback(id => {
    dispatch({
      type: "REMOVE_USER",
      id
    });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({
      type: "TOGGLE_USER",
      id
    });
  }, []);

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