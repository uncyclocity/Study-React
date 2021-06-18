# 챕터 1-8 : input 상태 관리하기

> 참고 : https://react.vlpt.us/basic/08-manage-input.html

#### 📕 주로 배운 내용

- 이벤트 객체

  - 이벤트에 등록하는 함수는 이벤트 객체 `e`를 파라미터로 받아올 수 있다.
  - `e.target`은 이벤트가 발생한 해당 DOM을 가리킨다. input 태그의 `e.target.value`를 통해 현재 input에 입력된 값을 가져오는 방법으로 활용할 수 있다.

  ##### Counter.js

  ```{.javascript}
  import { useState } from 'react';

  function InputSample() {
    const [text, setText] = useState("");

    const onChange = (e) => {
      setText(e.target.value);
    };

    const reset = () => {
      setText("");
    };

    return (
      <div>
        {/*  value 값을 설정해 주면 초기화 등으로 상태가 바뀌었을 때 input의 내용도 업데이트 되므로 중요하다.  */}
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
