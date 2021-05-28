import React from 'react';

function CreateUser({onChange, onCreate, username, email}) {
    // 렌더링 확인용
    console.log('CreateUser.js가 렌더링됨, ' + username + ", " + email);
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

// React.memo : 해당 컴포넌트에서 참고하고있는 prop 값이 변할 때 렌더링되며, prop 값이 변하지 않을 경우 렌더링 되지 않음
// 단, 컴포넌트 구현에 useState, useReducer, useContext 등의 Hooks 사용을 통한 상태 변경 시 렌더링됨
export default React.memo(CreateUser);