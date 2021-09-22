# 15. useReducer 를 사용하여 상태 업데이트 로직 분리하기

> _References_ <br> https://react.vlpt.us/basic/20-useReducer.html <br> https://xiubindev.tistory.com/104

## 📕 주로 배운 내용

- ### `useReducer()`
  ```
  import React, { useReducer } from "react";
  ```
  - 상태 업데이트 로직(`reducer` 함수)을 **컴포넌트와 분리**할 수 있다. <br> **같은 파일 내에서 컴포넌트 바깥**에 작성하거나, **별도의 파일**에 작성하여 import 할 수 있다. <br> 👉 Context API와 응용하면 **전역적 상태 관리**가 가능하다. 해당 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/summary/cp17">챕터 17</a> 참고
  - 컴포넌트에서 **관리하는 상태가 여러개**이며, **다양한 객체 및 배열이 얽힌 복잡한 구조**일 경우 이를 사용하는 것이 유리하다.

<br>

- ### `reducer` 함수의 구조

  ```javascript
  function reducer(state, action) {...}
  ```

  - **`state`** : 현재 상태
  - **`action`** : `dispatch` 함수를 통해 받은 객체
  - 보통 함수 로직은 switch-case문을 통해 `action.type` 값에 따라 **수행 할 상태 업데이트 로직**을 결정한다.

    ```javascript
    // 대응되는 dispatch 함수 호출 부분은 아래에 있어용
    function reducer(state, action) {
      switch (action.type) {
        case "ON_INCREASE":
          return {
            ...state,
            number: state.number + action.number,
          };
        default:
          return state;
      }
    }
    ```

<br>

- ### `useReducer` 함수의 구조

  ```javascript
  const [state, dispatch] = useReducer(reducer, initialState);
  ```

  - 함수의 파라미터

    - **`reducer`** : 상태 업데이트 로직을 담은 함수
    - **`initialState`** : 초기 상태

  - 함수의 반환 배열

    - **`state`** : 현재 상태
    - **`dispatch`** : 액션을 발생시키는 객체를 `reducer`에 넘겨주는 함수 <br> 👉 보통 `type` 키값에 **상태 업데이트 로직을 구분하는 고유의 문자열**을 넣는다.

      ```javascript
      // 대응되는 reducer 함수는 위에 있어용
      dispatch({
        type: "ON_INCREASE",
        number: 1,
      });
      ```

<br>

- ### `useReducer` 에제

  - <a href="https://github.com/uncyclocity/study_react/tree/main/summary/cp5/src/components/Counter.js">챕터 5의 Counter.js</a>를 수정하였다.

    **`App.js`**

    ```javascript
    import React, { useReducer } from "react";

    // 상태 업데이트 로직을 담은 reducer 함수
    function reducer(state, action) {
      switch (action.type) {
        case "ON_INCREASE":
          return state + action.number;
        case "ON_DECREASE":
          return state - action.number;
        default:
          return state;
      }
    }

    function App() {
      // useReducer()
      const [number, dispatch] = useReducer(reducer, 0);

      /* 더하기, 빼기 이벤트 함수에는,
      각각 필요한 로직을 사용하기 위해 필요한 값들이 담긴 객체를 dispatch 함수로 넘겨주었다. */
      const onIncrease = () => {
        dispatch({
          type: "ON_INCREASE",
          number: 1,
        });
      };

      const onDecrease = () => {
        dispatch({
          type: "ON_DECREASE",
          number: 1,
        });
      };

      return (
        <div>
          <h1>{number}</h1>
          <button onClick={onIncrease}>+1</button>
          <button onClick={onDecrease}>-1</button>
        </div>
      );
    }

    export default App;
    ```
