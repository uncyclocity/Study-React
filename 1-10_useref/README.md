# 1-10. useRef 활용하기

> _References_ <br> https://react.vlpt.us/basic/10-useRef.html <br> https://react.vlpt.us/basic/12-variable-with-useRef.html

## 📕 주로 배운 내용

- ### `useRef` Hook의 기능

  - **특정 DOM 선택 :** <br> Vanila JS에서 `getElement`을 사용하듯, React에서는 **ref를 사용하여 특정 DOM을 선택할 수 있다.**
  - **변수 역할 :** <br> state와는 다르게 **리렌더링 없이 업데이트 된 값을 조회할 수 있는 변수**를 만들 수 있다.

<br>

- ### 시작하기

  - `useRef`를 import를 해준다.

    ```javascript
    import { useRef } from "react";
    ```

<br>

- ### ref로 특정 DOM 선택하기

  - 특정 변수를 ref 객체로 만든다.

    ```javascript
    const refVal = useRef();
    ```

  - 컴포넌트의 JSX 코드 내부에서 **제어하려는 DOM의 태그에 `ref` 속성을 지정**한다. <br> 속성 값은 **ref 객체로 만들어 준 변수**를 넣어준다.

    ```javascript
    return (
      ...
      <input name="example_input" ref={refVal} {...rest} />
      ...
    );
    ```

  - 이후, 필요에 따라 해당 ref 속성을 지정한 DOM을 조작할 수 있다. <br> **ref 객체의 `current`** 가 해당 DOM을 가리킨다.

    ```javascript
    refVal.current.focus; // example_input에 포커스 지정
    ```

    ```javascript
    refVal.current.value = "Hello World!"; // example_input의 value를 변경
    ```

<br>

- ### ref를 변수로 활용하기

  - 특정 변수를 ref 객체로 만들때, **변수의 초기 값**을 인자로 넘겨준다.

    ```javascript
    // 초기 값을 0으로 설정함
    const refVal = useRef(0);
    ```

  - 변수값은 **ref 객체의 `current`** 가 가리킨다.

    ```javascript
    console.log("결과값 : " + refVal.current);
    ```

    <center> ⬇ </center>

    ```bash
    결과값 : 0
    ```

  - 수정하더라도 리렌더링 되지 않으며, 리렌더링 없이 업데이트된 값을 조회할 수 있다.

    ```javascript
    refVal.current += 1;
    console.log("결과값 : " + refVal.current);
    ```

    <center> ⬇ </center>

    ```bash
    결과값 : 1
    ```
