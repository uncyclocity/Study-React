# 챕터 1-20 : useReducer 를 사용하여 상태 업데이트 로직 분리하기

> 참고 <br> https://react.vlpt.us/basic/20-useReducer.html <br> https://xiubindev.tistory.com/104

#### 📕 주로 배운 내용

- `useReducer()` 기본 개념
  ```
  import React, { useReducer } from "react";
  ```
  - **컴포넌트와 상태 업데이트 로직을 분리**함으로써, 복잡한 상태를 쉽게 관리할 수 있도록 한다.
  - 상태 업데이트 로직(`reducer` 함수)을 컴포넌트 함수 바깥에서 작성하거나, 아에 별도의 파일로 작성하여 불러올 수도 있다.
  - 컴포넌트에서 관리하는 상태 값이 여러개이며, 다양한 객체 및 배열이 얽힌 복잡한 구조일 경우 이를 사용하는 것이 유리하다.

<br>

- `useReducer` 함수의 형태 : `const [state, dispatch] = useReducer(reducer, initialState);`

  - `reducer` : 상태 업데이트 로직을 담은 함수(아래의 '`reducer` 함수의 형태' 참고)
  - `initialState` : 초기 상태
  - `state` : 현재 상태
  - `dispatch` : 액션을 발생시키는 객체를 `reducer`에 넘겨주는 함수이다. `reducer`의 두 번째 인자에 들어간다.

    - 보통 `type`이라는 값에 업데이트 로직을 구분하는 값을 넣는다.

      ```
      // 당연히 컴포넌트 내부에서 선언해준다.
      const [state, dispatch] = useReducer(reducer, 0);

      (코드 생략...)

      /*
        - 컴포넌트 내부에서, reducer 함수의 원하는 숫자를 더하는 로직을 작동시키는 객체의 예시이다.
          (이를 실행시키는 예시 로직은 아래 'reducer 함수의 형태' 참고)
      */
      dispatch(
        {
          type: "ON_INCREASE",
          number: 1
        }
      )
      ```

<br>

- `reducer` 함수의 형태 : `function reducer(state, action) {...}`

  - `state` : 현재 상태
  - `action` : `dispatch` 함수를 통해 받은 객체

    ```
    // 당연히 컴포넌트 내부에서 선언해준다.
    const [state, dispatch] = useReducer(reducer, 0);
    ```

    ```
    /*
      - 컴포넌트 외부에서 선언해준다.
      - action 값에 위의 dispatch 함수에 넣어 준 객체가 들어간다.
        type 값에 따라, 위의 기존 상태값 0을 1로 만들어준다.
    */
    function reducer(state, action) {
      switch(action.type) {
        case "ON_INCREASE":
          return state + action.number;
        case "ON_DECREASE":
          return state - action.number;
        default:
          return state;
      }
    }
    ```

<br>

- 예시 코드 정리

  ```{.javascript}
  import React, { useReducer } from 'react';

  // 상태 업데이트 로직을 담은 reducer 함수, useReducer() 첫 번째 인자로 들어감
  function reducer(state, action) {
    switch (action.type) {
      case "ON_INCREASE":
        return state + action.number;
      case "ON_DECREASE":
        return state - action.number;
      default:
        return state;
    };
  }

  function App() {
    /*
      useReducer()
      - reducer 함수와 초기 상태를 인자로 넘긴다.
      - 각각 상태, dispatch 함수를 받아올 수 있다.
    */
    const [number, dispatch] = useReducer(reducer, 0);

    /*
      - 디스패치 함수를 통해, 각 함수에 맞는 액션을 실행하기 위한 객체를 넘겨 주었다. -> reducer 함수의 로직이 실행된다.
      - 객체 리터럴 문법에 따라, 원하는 변수를 넣어줄 수 있다. (객체 key값 지정 없이 넘길 경우, key값은 변수명을 따른다.)
    */
    const onIncrease = () => {
      dispatch(
        {
          type: 'ON_INCREASE',
          number: 1
        });
    };

    const onDecrease = () => {
      dispatch(
        {
          type: 'ON_DECREASE',
          number: 1
        });
    };

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    )
  }

  export default UserList;
  ```
