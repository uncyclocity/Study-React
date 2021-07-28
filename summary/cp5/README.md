# 5. useState를 통한 상태 관리 & 이벤트 핸들링

> _References_ <br> https://react.vlpt.us/basic/07-useState.html <br> https://webigotr.tistory.com/293

## 📕 주로 배운 내용

- ### `useState` Hook을 통한 상태 관리

  - 함수형 컴포넌트에서는 **Hooks**를 통해 다양한 작업을 수행할 수 있다.
  - 컴포넌트에서 사용되는 동적인 값을 **상태(state)** 라고 부른다.
  - 상태 값의 수정이 아닌 **변경에 의해 리렌더링이 진행**되기에, 상태의 **불변성**을 지켜주어야 한다.
  - **`useState` Hook**을 통해 함수형 컴포넌트에서 **상태 관리**를 할 수 있다.

<br>

- ### 시작하기

  - `useState` Hook을 import 해준다.

    ```javascript
    import { useState } from "react";
    ```

  - 구성 요소

    ```javascript
    const [state, setState] = useState(initialState);
    ```

    - **`state`** : 현재 상태
    - **`setState`** : 상태를 변경하는 setter 함수 👉 상태의 **불변성**을 지키기 위해 필요
    - **`initialState`** : 초기 상태값

<br>

- ### 그래서 불변성이 뭐고, 어떻게 하는건데요🤔

  - **불변성**이란? 기존 값을 그대로 유지하면서 새로운 값을 추가 하는 것 <br> 👉 다시 말해서, 객체가 생성 된 이후 그 상태를 변경할 수 없는 **디자인 패턴**이다.
  - 상태 값을 업데이트 할 경우, 기존 값을 수정하는 것이 아닌 **새로운 값을 상태로 지정**해주어야 한다. <br> 👉 이를 **"불변성을 지킨다"** 라고 한다.
  - 불변성을 지키는 이유 : 리액트는 상태 변경에 따라 리렌더링을 수행하는데, 현재 상태와 바뀔 상태 값을 **메모리 주소**로 비교하기 때문이다.

    ```javascript
    const [state, setState] = useState(false);

    // state = true 👉 참조값이 변경되지 않기 때문에 불변성 X
    setState(state); // 불변성 O
    ```

<br>

- ### JSX에서의 이벤트 핸들링

  - JSX에서 이벤트 핸들러 명칭은 **`on` 다음의 글자를 대문자로 표기한다.** <br> `onclick` ➡ `onClick`
  - `핸들러={실행할함수}` 형태로 작성한다.

    ```javascript
    const greeting = () => {
      console.log("Hello World");
    };

    return <button onClick={greeting}></button>;
    ```

  - `onClick={onIncrease()}`와 같이 함수 실행 코드를 넣으면, 이벤트 발생 여부와 상관없이 **렌더링 시점에서 함수 호출**이 이루어진다. <br> 👉 `onClick={onIncrease}`혹은 `onClick={() => onIncrease()}` 형태로 작성해야 하며, **파라미터**를 넘겨주어야 할 경우에는 **후자**로 작성하면 된다.

<br>

- ### 「이벤트 × 상태 관리」 예제

  - 예제 내용 : +1/-1 버튼을 눌러 표시되는 숫자를 조절하는 코드

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
  - `useCallback()`와 `useState()`를 함께 사용할 때 최적화에 용이하다. 이에 대한 자세한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/summary/cp13">챕터 13</a> 참고

    ```javascript
    const onIncrease = () => {
      setNum((preNum) => preNum + 1);
    };

    const onDecrease = () => {
      setNum((preNum) => preNum - 1);
    };
    ```
