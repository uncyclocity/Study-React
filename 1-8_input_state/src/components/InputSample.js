import { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");

  /*
  이벤트에 등록하는 함수는 이벤트 객체 e를 파라미터로 받아올 수 있다.
  e.target은 이벤트가 발생한 DOM을 가리킨다. 따라서 e.target.value는 이벤트가 발생한 input에 입력된 값을 가져온다.
  */
  const onChange = (e) => {
    setText(e.target.value);
  };

  const reset = (e) => {
    setText("");
  };

  return (
    <div>
      {/* value 값을 설정해 주면 초기화 등으로 상태가 바뀌었을 때 input의 내용도 업데이트 되므로 중요하다. */}
      <input onChange={onChange} value={text} />
      <button onClick={reset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
