# 챕터 1-8 : input 상태 관리하기

> 참고 : https://react.vlpt.us/basic/08-manage-input.html

#### 📕 주로 배운 내용

- 이벤트 객체

  - 이벤트에 등록하는 함수는 이벤트 객체 `e`를 파라미터로 받아올 수 있다.
  - `e.target`은 **이벤트가 발생한 해당 DOM**을 가리킨다.<br>
    사용예시) input 태그에 이벤트가 발생했을 경우, `.value` 값 가져오기

  ##### Counter.js

  ```
  import { useState } from 'react';

  function InputSample() {
    const [text, setText] = useState("");

    const onChange = (e) => {
      // e.target = 이벤트가 발생한 input 태그
      setText(e.target.value);
    };

    const reset = () => {
      setText("");
    };

    return (
      <div>
        {/*
          value 값을 설정해 주면, 이벤트를 통해 input을 가리키는 상태가 바뀌었을 때
          input의 내용도 업데이트 되도록 할 수 있다.
        */}
        <input onChange={onChange} value={text} />
        <button onClick={reset}>초기화</button>
        <div>
          <b>값 : {text}</b>
        </div>
      </div>
    )
  }

  export default InputSample;
  ```
