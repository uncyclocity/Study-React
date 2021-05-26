import React from 'react';

function CreateUser({onChange, onCreate, username, email}) {
    // 렌더링 확인용
    console.log('CreateUser.js가 렌더링됨')
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
                vlaue={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

// React.memo : 해당 컴포넌트에서 참고하고있는 prop 값이 그대로 -> 렌더링 안함
// 단, 컴포넌트 구현에 useState, useReducer, useContext 사용 시 렌더링됨
export default React.memo(CreateUser);