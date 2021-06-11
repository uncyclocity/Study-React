import { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  // Ref 객체 만들기
  const nameInput = useRef();

  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const reset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    // ref 값이 설정된 "name" 인풋 태그에 포커스를 잡을 것
    nameInput.current.focus();
  };

  return (
    <div>
      {/* 원하는 DOM에 ref 값을 설정 */}
      <input
        name="name"
        value={name}
        placeholder="이름"
        onChange={onChange}
        ref={nameInput}
      />
      <input
        name="nickname"
        value={nickname}
        placeholder="닉네임"
        onChange={onChange}
      />
      <button onClick={reset}>초기화</button>
      <div>
        <b>값: </b>
        {nickname ? name + "(" + nickname + ")" : name}
      </div>
    </div>
  );
}

export default InputSample;
