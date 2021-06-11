# 챕터 1-10 : useRef 로 특정 DOM 선택하기

> 참고 : https://react.vlpt.us/basic/10-useRef.html

#### 📕 주로 배운 내용

- 특정 DOM 선택 및 기능 구현

  - 리액트 프로젝트에서도 간혹 엘리먼트의 크기나 스크롤 바의 위치를 가져오거나, 포커스를 설정하는 등 특정 DOM을 선택해야 할 상황이 있다.
  - 바닐라JS에 `getElementById`가 있다면, 리엑트는 `ref`가 있다.
  - 함수형 컴포넌트에는 `useRef` Hook 함수를 통해 사용할 수 있다. 참고로 클래스형 컴포넌트 시절에는 `React.createRef`라는 함수를 사용했다고 한다.

  ##### 상태 리셋 시 Name Input 태그에 포커스를 주는 예시 (components/InputSample.js)

  ```{.javascript}
  import { useState, useRef } from 'react';

  function InputSample() {
    const [inputs, setInputs] = useState({
      fullname: "",
      nickname: ""
    });

    // ref 객체 생성
    const nameInput = useRef();

    const {fullname, nickname} = inputs;

    const onChange = e => {
      const {name, value} = e.target;

      useState({
        ...inputs,
        [name]: value,
      });
    };

    const reset = () => {
      useState({
          fullname: "",
          nickname: ""
      });
      // 객체명.current : DOM 자체를 가리키게 됨
      nameInput.current.focus();
    };

    return (
      <div>
        {/* 원하는 DOM에 ref 값을 설정 */}
        <input name="fullname" value={fullname} onChange={onchange} ref={nameInput}/>
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
