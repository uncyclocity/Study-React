# 6. 이벤트 객체로 input 상태 관리하기

> _References_ <br> https://react.vlpt.us/basic/08-manage-input.html

## 📕 주로 배운 내용

- ### 이벤트 객체

  - 이벤트 발생 시 실행되는 함수의 경우, **이벤트 객체 `e`** 를 파라미터로 넘겨받을 수 있다.
  - `e.target`은 **이벤트가 발생한 해당 DOM**을 가리킨다. <br> (활용 예시 : `onChange`를 통해 input 태그의 입력값이 변경 될 때마다 `e.target.value`을 받아올 수 있다.)

    ```javascript
    const onChange = (e) => {
      console.log(e.target.value);
    };

    return <input onChange={onChange} />;
    ```

<br>

- ### 「이벤트 객체 × input 상태 관리」 예제

  - input에 입력할 때 마다 `text` 상태가 변경되며, 이는 input 태그의 value 값으로 연결된다.
  - 초기화 버튼을 누르면 text 값을 빈 값으로 지정함 <br> 👉 input 태그의 value 값도 빈값이 된다.

    **`InputSample.js`**

    ```javascript
    import { useState } from "react";

    export default function InputSample() {
      const [text, setText] = useState("");

      // e.target = 이벤트가 발생한 input 태그
      const onChange = (e) => setText(e.target.value);

      const reset = () => setText("");

      return (
        <div>
          <input onChange={onChange} value={text} />
          <button onClick={reset}>초기화</button>
          <div>
            <b>값 : {text}</b>
          </div>
        </div>
      );
    }
    ```
