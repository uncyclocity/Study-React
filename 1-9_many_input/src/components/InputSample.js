import { useState } from "react";

function InputSample() {
  // 상태 값이 여러개일 경우 객체 형태로 초기화 해주면 된다.
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  // 각 input 값이 저장된 객체 요소를 객체 비구조화 할당으로 가져옴
  const { name, nickname } = inputs;

  const onChange = (e) => {
    // 이벤트가 일어난 input 태그의 name값과 value값을 가져옴
    const { name, value } = e.target;

    /*
      spread operator을 이용하여 inputs 객체의 요소들을 모두 가져옴
      -> 그중에서도 input.[name 변수 값]의 값을 변경한 객체를 새 상태로 적용함으로써 불변성을 지킨다.
      (이벤트가 일어난 name 속성 값에 따라 name이 바뀔 수도 nickname이 바뀔 수도 있다)

      불변성 지키기
      - 기존 상태를 수정하는 것이 아니라, 새로운 값을 만들어 이를 상태로 적용해야 한다.
      - 불변성을 지켜주면 컴포넌트 업데이트 성능 최적화를 하기 수월해진다.
    */
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
  };

  return (
    <div>
      <input name="name" value={name} placeholder="이름" onChange={onChange} />
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
