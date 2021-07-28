# 17. Context API 를 사용한 전역 값 관리

> _References_ <br> https://react.vlpt.us/basic/22-context-dispatch.html <br> https://xiubindev.tistory.com/105

## 📕 주로 배운 내용

- ### Context API

  - 모든 컴포넌트에서 **전역**으로 **원하는 값**을 사용할 수 있도록 하는 리액트 내장 API이다.
  - 복잡하게 **여러 컴포넌트를 거쳐 목적지 컴포넌트에 값을 전달하는 문제**를 해결할 수 있다.
  - `createContext()`으로 컨텍스트를 **생성**하고, `useContext()`으로 **조회**한다.

<br>

- ### Context API 함수 정리

  - `createContext()` : 컨텍스트를 생성함

    ```javascript
    // 인자에는 기본 값이 들어간다.
    // 외부에서 조회해야 하므로 export 해준다.
    export const Context = createContext(null);
    ```

    - `createContext().Provider` : 해당 컨텍스트의 **값을 설정**하고, **자식 컴포넌트에 전달**하는 컴포넌트

      ```javascript
      return (
        <Context.Provider value=true>
          {children}
        </Context.Provider>
      );
      ```

  - `useContext()` : 컨텍스트를 조회함

    ```javascript
    const contextExample = useContext(Context);
    ```

<br>

- ### Context API 사용하기

  > 설명의 편의를 위한 용어 정리(실제 사용되는 용어 아님 주의)
  >
  > 생성 컴포넌트 : 컨텍스트가 생성 될 컴포넌트
  > 조회 컴포넌트 : 컨텍스트가 조회 될 컴포넌트
  > 생성 파일 : 1이 위치한 파일
  > 조회 파일 : 2가 위치한 파일

  - 생성 파일에 `createContext`를 import 해준다.

    ```javascript
    import { createContext } from "react";
    ```

  - 생성 컴포넌트에서 변수를 생성한 뒤, `createContext()` 함수를 넣어주고 기본 값을 파라미터로 넘겨준다.

    - 해당 변수를 외부에서 사용할 수 있도록 export 해준다.

      ```javascript
      export const Name = createContext(null);
      ```

  - 생성 컴포넌트에서 **`Provider` 컴포넌트를 통해 context 값을 지정**하고, 자식 컴포넌트들을 감싸서 반환해준다.

    - `value` 값을 지정하지 않을 경우 지정한 기본 값이 넘겨진다.

      ```javascript
      return <Name.Provider value="백괴">{children}</Name.Provider>;
      ```

  - 조회 파일에 `useContext`와 컨텍스트 변수를 import 해준다.

    ```javascript
    import { useContext } from "react";
    import { Name } from "./components/GetName";
    ```

  - 조회 컴포넌트에 변수를 생성하여 `useContext` 함수를 넣어주고, **import해준 context 변수**를 파라미터로 넘겨준다.

    ```javascript
    const myName = useContext(Name);
    ```

  - 값을 잘 활용한다😊

    ```javascript
    console.log(`제 이름은 ${myName} 입니다.`);
    ```

<br>

- ### `useReducer` 활용
  - context 값을 **`useReducer`의 `reducer` 함수에 객체를 전달하는 `dispatch` 함수**로 설정해 주면, 전역적으로 해당 함수를 호출하여 상태를 관리할 수 있게 된다. <br> (`useReducer`에 대한 내용은 <a href="https://github.com/uncyclocity/study_react/tree/main/summary/cp15">챕터 15</a> 참고)
    ```javascript
    const [state, dispatch] = useReducer(reducer, initialState);
    ...
    return (
      <UserDispatch.Provider value={dispatch}>
        <PassComponent />
      </UserDispatch.Provider>
    )
    ```

<br>

- ### 컨텍스트 조회용 커스텀 Hook

  - **컨텍스트가 생성 된 파일** 내에서 컨텍스트 조회용 커스텀 Hook을 만들면 **조회 시 필요한 코드 양을 줄일 수 있다.**

    ```javascript
    // 컨텍스트가 존재하지 않을 경우 호출
    const notCtx = () => {
      throw new Error("Context를 찾을 수 없습니다.");
    };

    // 컨텍스트 조회용 커스텀 Hook
    export const useNameCtx = () => {
      return useConetxt(Name) || notCtx();
    };
    ```
