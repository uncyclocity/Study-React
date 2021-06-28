# 챕터 1-7 : useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

> 참고 : https://react.vlpt.us/basic/07-useState.html

#### 📕 주로 배운 내용

- 이벤트 설정

  - `on이벤트이름={실행할 함수}` 형식으로 작성하여야 한다.
  - `onClick={onIncrease}`이나, `onClick={() => num + 1}`처럼 함수타입의 값을 넣어주어야 한다.
  - `onClick={onIncrease()}`와 같이 함수 실행 코드를 넣으면 렌더링이 이루어질 때마다 함수가 실행되며, 무한루프가 일어날 수 있다.
    👉 이러한 무한 루프는 React 시스템에서 제한하고 있으며, 오류 페이지를 볼 수 있을 것이다.

  ##### Counter.js

  ```
  function Counter() {
    const onIncrease = () => {
        console.log('증가');
    };

    const onDecrease = () => {
        console.log('감소');
    };

    return (
      <div>
        <h1>0</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }

  export default Counter;
  ```

  <br>

- `useState` Hook을 이용한 상태 관리

  - 컴포넌트에 있어 동적인 값은 **상태**라고 부른다.
  - `useState` Hook을 사용하면 함수형 컴포넌트에서 상태 관리를 할 수 있다.

  <br>

- 시작하기

  ```
  import React, { useState } from "react";
  ```

  ```
  const [state, setState] = useState(initialState);
  ```

  - `state` : 현재 상태
  - `setState` : 상태를 변경하는 setter 함수
  - `initialState` : 초기 상태값
  - 사용 예제

    ##### Counter.js

    ```
    import { useState } from 'react';

    function Counter() {
      /*
        const numState = useState(0);

        상태, Setter 함수 받기
        const num = numState[0];
        const setNum = numState[1];
        위의 과정들을 '배열 비구조화 할당'을 통해 아래 한줄로 축약함
      */
      const [num, setNum] = useState(0);

      const onIncrease = () => {
        setNum(num + 1);
      };

      const onDecrease = () => {
        setNum(num - 1);
      };

      return (
        <div>
          <h1>{num}</h1>
          <button onClick={onIncrease}>+1</button>
          <button onClick={onDecrease}>-1</button>
        </div>
      );
    }

    export default Counter;
    ```

    <br>

- 함수형 업데이트

  - 기존의 상태값이 인자로 들어온다.
  - `useCallback()`와 함께 사용할 때 최적화에 용이하다. (<a href="https://github.com/uncyclocity/study_react/tree/main/1-19_react.memo">챕터 1-19 참고</a>)

  ```
  const onIncrease = () => {
    setNum(preNum => preNum + 1);
  };

  const onDecrease = () => {
    setNum(preNum => preNum - 1);
  };
  ```
