# 챕터 1-9 : 여러개의 input 상태 관리하기

> 참고 : https://react.vlpt.us/basic/09-multiple-inputs.html

#### 📕 주로 배운 내용

- 여러개의 상태 관리하기

  - `useState()` Hook을 사용할 때, 상태를 객체로 지정함으로써 복수의 상태를 관리할 수 있다.
    ```{.javascript}
    const [states, setStates] = useState({
      id: 1,
      name: "Uncyclocity"
    });
    ```

  <br>

- spread 연산자를 통해 불변성 지키기

  - 상태 업데이트는 기존 상태를 수정하는 것이 아닌, 새로운 값을 상태로 지정해야만 한다. 이러한 작업을 **"불변성을 지킨다"** 라고 한다.
  - `states[name] = "new name"` 형태로 업데이트해서는 안되며, 아래와 같이 새로운 객체를 만들어준다.
    ```{.javascript}
    // spread 연산자를 사용하여 기존 값들을 복붙해주었다.
    setStates({
      ...states,
      [name]: "new name"
    });
    ```
  - 위와 같이, 복수의 상태를 관리할 때는 spread 연산자를 통해 기존의 값을 복붙해 준 다음, 그중에 원하는 상태의 값만 변경한 객체를 만들어 새 상태로 지정한다.

  <br>

- 사용 예시
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
      // 인자로 받는 e.target이 객체 리터럴이므로, 객체 비구조 할당으로 name, value 값을 가져온다.
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
