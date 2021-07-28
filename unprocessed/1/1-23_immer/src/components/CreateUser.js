import React, { useRef, useContext, useCallback } from "react";
import { UserDispatch } from "../App";
import useInputs from "../hooks/useInputs";

function CreateUser() {
  console.log("CreateUser() 컴포넌트 입장");

  const dispatch = useContext(UserDispatch);

  const [{ username, email }, onChange, onInit] = useInputs({
    username: "",
    email: "",
  });

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    dispatch({
      type: "ON_CREATE",
      user,
    });

    nextId.current += 1;

    onInit();
  }, [username, email, dispatch, onInit]);

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

export default React.memo(CreateUser);
