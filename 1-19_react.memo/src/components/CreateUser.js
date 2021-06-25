import React from "react";

function CreateUser({ username, email, onChange, onCreate, onInit }) {
  // 컴포넌트 리렌더링을 확인하기 위함
  console.log("CreateUser() 컴포넌트 입장");
  return (
    <div>
      <input
        onChange={onChange}
        name="username"
        placeholder="유저네임"
        value={username}
      />
      <input
        onChange={onChange}
        name="email"
        placeholder="이메일"
        value={email}
      />
      <button onClick={onCreate}>추가하즈아</button>
      <button onClick={onInit}>초기화즈아</button>
    </div>
  );
}

/*
  React.memo
  - 컴포넌트의 props가 바뀌지 않았을 경우 리렌더링을 방지함으로써, 컴포넌트 리렌더링 성능 최적화를 해줄 수 있는 함수이다.
  - 그저 컴포넌트 함수를 감싸기만 하면 된다. 바로 이렇게!
*/
export default React.memo(CreateUser);
