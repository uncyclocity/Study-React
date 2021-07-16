# 1-7. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

> _References_ <br> https://react.vlpt.us/basic/07-useState.html <br> https://webigotr.tistory.com/293

## 📕 주로 배운 내용

- ### JSX 에서의 이벤트 설정

  - HTML 과 달리, JSX에서 이벤트는 **`on` 다음의 글자를 대문자로 표기한다.** <br> `onclick` ➡ `onClick`
  - 보통 `on이벤트이름={실행할함수}` 형태로 작성한다.

    ```javascript
    const greeting = () => {
      console.log("Hello World");
    };

    return <button onClick={greeting}></button>;
    ```

  - `onClick={onIncrease()}`와 같이 함수 실행 코드를 넣으면, 이벤트 발생 여부와 상관없이 **렌더링 시점에서 함수가 호출되어 버린다.** <br> 👉 `onClick={onIncrease}`(화살표 함수일 경우) 혹은 `onClick={() => onIncrease()}` 형태로 작성한다. <br> 파라미터를 넘겨주어야 할 경우에는 후자로 작성하면 된다.

<br>

- ### `useState` Hook을 통한 상태 관리

  - 함수형 컴포넌트에서는 **Hooks**를 통해 다양한 작업을 수행할 수 있다.
  - 컴포넌트에서 사용되는 동적인 값을 **상태(state)** 라고 부른다.
  - `useState` Hook을 사용하면 **함수형 컴포넌트에서 상태 관리를 할 수 있다.**

<br>

- ### `useState` 시작하기

  - `useState` Hook을 import 해준다.

    ```javascript
    import { useState } from "react";
    ```

  - 구성 요소

    ```javascript
    const [state, setState] = useState(initialState);
    ```

    - `state` : 현재 상태
    - `setState` : 상태를 변경하는 setter 함수 👉 **상태 불변성**을 지키기 위해 필요
    - `initialState` : 초기 상태값

<br>

- ### 리액트에서의 상태 불변성

  - 상태를 변경 할 경우, 기존 값을 수정하는 것이 아닌 **새로운 값을 상태로 지정해주어야 한다.** <br> 👉 이를 **"불변성을 지킨다"** 라고 한다.
  - 불변성을 지키는 이유 : 리액트는 상태 변경에 따라 리렌더링을 수행하는데, 현재 상태와 바뀔 상태의 값을 **참조값**으로 비교하기 때문이다.

    ```javascript
    const [state, setState] = useState(false);

    // state = true 👉 참조값이 변경되지 않기 때문에 불변성 X
    setState(state); // 불변성 O
    ```

<br>

- ### 「이벤트 × 상태 관리」 예제

  - +1/-1 버튼을 눌러 표시되는 숫자를 조절하는 코드
  - `App` 컴포넌트는 생략

    **`Counter.js`**

    ```javascript
    import { useState } from "react";

    function Counter() {
      /* const numState = useState(0);
        const num = numState[0]; // 상태
        const setNum = numState[1]; // setter 함수
        위의 과정들을 '배열 비구조화 할당'문법을 통해 아래 한줄로 축약함 */
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

- ### 함수형 업데이트

  - **기존의 상태값**이 함수의 인자로 자동으로 들어온다.
  - `useCallback()`와 `useState()`를 함께 사용할 때 최적화에 용이하다. 이에 대한 자세한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-19_react.memo">챕터 1-19</a> 참고

    ```javascript
    const onIncrease = () => {
      setNum((preNum) => preNum + 1);
    };

    const onDecrease = () => {
      setNum((preNum) => preNum - 1);
    };
    ```
