# 챕터 1-22 : Context API 를 사용한 전역 값 관리

> 참고 <br> https://react.vlpt.us/basic/22-context-dispatch.html <br> https://xiubindev.tistory.com/105

#### 📕 주로 배운 내용

- context API 기본 개념
  - 전역적으로 함수, 상태, DOM 등의 원하는 값을 사용하거나 관리할 수 있도록 하는 리액트 내장 API이다.
  - 이를 통해 복잡하게 여러 컴포넌트를 거쳐 목적지 컴포넌트에 값을 전달하는 문제를 해결할 수 있다.
  - Provider 컴포넌트를 통해 범위를 지정함으로써 해당 범위 내의 컴포넌트에서 얼마든지 지정한 값을 사용할 수 있다.

<br>

- 사용 예시(context 값 : useReducer() 디스패치 함수)

  - 변수에 createContext() 함수를 담고 이를 내보내기 (App.js)

    - context의 기본값이 인자로 들어간다.

    ```{.javascript}
    export const UserDispatch = React.createContext(null);
    ```

  - context 값을 지정하고, 이를 사용 할 컴포넌트를 감싸주기 (App.js)

    - Provider 컴포넌트를 이용한다.

    ```{.javascript}
    return (
      // Provider 컴포넌트로 context 값을 지정하고 컴포넌트를 감싸 주었다.
      <UserDispatch.Provider value={dispatch}>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
          onInit={onInit}
        />

        {/*
          이전의 코드에서는 UserList 컴포넌트에 onRemove, Activer 함수를 넘겨주었으나,
          UserList 컴포넌트에서는 해당 함수가 실행되지 않고 User 컴포넌트에서 실행되므로
          우리는 굳이 두 번 넘겨주지 않고 User 컴포넌트에서 context 값인 디스패치 함수를 이용하여
          직접 실행하도록 만들어 줄 것이다.
        */}
        <UserList users={state.users} count={count} />
      </UserDispatch.Provider>
    );
    ```

  - context 값을 불러오기 (UserList.js)

    ```{.javascript}
    // useContext() Hook와, 컨텍스트가 담긴 변수 UserDispatch를 App.js에서 가져와서 import 해준다.
    import React, { useContext } from 'react';
    import { UserDispatch } from '../App';

    const User = React.memo(function User({ user }) {
      // App 컴포넌트에서 가져 온 context가 담긴 변수에서 context 값(디스패치 함수)을 불러온다.
      const dispatch = useContext(UserDispatch);

      return(
          <>
            <b
              (중간생략)
              // 받아 온 디스패치 함수를 이용하여 상태를 관리한다.
              onClick={() => dispatch({type: "ACTIVER", id: user.id})}
            >
              {user.username}
            </b>
            <span>({user.email})</span>

            // 받아 온 디스패치 함수를 이용하여 상태를 관리한다.
            <button onClick={() => dispatch({type: "ON_REMOVE", id: user.id})}>
              삭제하기
            </button>
          </>
      );
    });

    function UserList({users, count}) {
      return(
        <>
          {users.map((user) => {
            {/* 기존에 넘겨주었던 onRemove, Activer 함수를 이번에는 넘겨주지 않는다. */}
            <User user={user} key={user.id} />
          })}
          <span> 현재 사용자 수 : </span> <b>{count}</b>
        </>
      )
    }
    ```
