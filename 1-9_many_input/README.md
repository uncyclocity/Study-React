# 챕터 1-9 : 여러개의 input 상태 관리하기

> 참고 : https://react.vlpt.us/basic/09-multiple-inputs.html

#### 📕 주로 배운 내용

- 여러개의 상태 관리하기

  - useState에서 객체를 통해 복수의 상태를 관리할 수 있다.

  <br>

- 불변성 지키기

  - 기존 상태를 수정하는 것이 아닌, 새로운 값을 상태로 지정하는 것
  - 불변성을 지킴으로써 컴포넌트 성능 향상을 이룩할 수 있다.

  ##### InputSample.js

  ```{.javascript}
  import { useState } from 'react';

  function InputSample() {
    // 객체를 통한 복수의 상태 지정
    const [inputs, setInputs] = useState({
      fullname: "",
      nickname: ""
    });

    // 객체 비구조 할당을 통해 각 상태값을 가져올 수 있다.
    const {fullname, nickname} = inputs;

    const onChange = e => {
      // 인자로 받는 e가 객체 리터럴이므로, 객체 비구조 할당으로 name, value 값을 가져온다.
      const {name, value} = e.target;

      /*
      spread operator을 이용하여 기존 상태의 요소만 가져옴
      -> 그중에서도 inputs[name 변수 값]의 값을 바꾼 객체를 새 상태로 설정하여 불변성을 지킴
      */
      useState({
        ...inputs,
        [name]: value,
      });;
    };

    const reset = () => {
      useState({
          fullname: "",
          nickname: ""
      });
    };

    return (
      <div>
        <input name="fullname" value={fullname} onChange={onchange} />
        <input name="nickname" value={nickname} onChange={onchange} />
        <button onClick={reset}>초기화</button>
        <div>
          <b>값 : </b>
          {nickname ? fullname + "(" + nickname + ")" : fullname}
        </div>
      </div>
    );
  }

  export default InputSample;
  ```
