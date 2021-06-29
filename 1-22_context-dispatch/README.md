# 챕터 1-22 : Context API 를 사용한 전역 값 관리

> 참고 <br> https://react.vlpt.us/basic/22-context-dispatch.html <br> https://xiubindev.tistory.com/105

#### 📕 주로 배운 내용

- context API 기본 개념
  - **전역적으로 함수, 상태, DOM 등의 원하는 값을 사용**할 수 있도록 하는 리액트 내장 API이다.
  - 이를 통해, 복잡하게 여러 컴포넌트의 props를 거쳐 목적지 컴포넌트에 값을 전달하는 문제를 해결할 수 있다.
  - `createContext()` 함수가 반환하는 **`Provider` 컴포넌트**를 통해 context에서 사용 할 값을 설정할 수 있으며, 자식 컴포넌트에 context 값을 제공한다.
    ```
    return (
      <SampleContext.Provider value="값">
        <SampleComponent />
      </SampleContext.Provider>
    );
    ```
  - `useContext()` Hook을 통해 손쉬운 조회 부분 코드 작성이 가능하다.
    ```
    const SampleContext = createContext(null);
    ...
    function Sample() {
      const SampleContext = useContext(SampleContext);
      return <>{SampleContext}</>;
    }
    ```

<br>

- 사용하기

  - 설명의 편의를 위한 용어 정리(실제 사용되는 용어 아님 주의)

    > 1. 생성 컴포넌트 : context가 생성 될 컴포넌트
    > 2. 조회 컴포넌트 : context 값이 조회 될 컴포넌트
    > 3. 생성 파일 : 1이 위치한 파일
    > 4. 조회 파일 : 2가 위치한 파일

  - 각각 생성 파일에 **`createContext`**, 조회 파일에 **`useContext`** 를 import 해준다.

    - `createContext` : context를 생성
    - `useContext` : context를 조회

    - 생성 파일 **=** 조회 파일

      ```
      import React, { createContext, useContext } from "react";
      ```

    - 생성 파일 **≠** 조회 파일
      ##### 생성 파일
      ```
      import React, { createContext } from "react";
      ```
      ##### 조회 파일
      ```
      import React, { useContext } from "react";
      ```

  - 생성 컴포넌트에서 변수를 생성하고, context를 생성하는 `createContext()` 함수를 넣어준다. 인자에는 기본 값을 넘겨준다.

    - 생성 파일 **=** 조회 파일
      ```
      const Name = createContext(null);
      ```
    - 생성 파일 **≠** 조회 파일<br>
      1. context 변수를 외부에서 사용할 수 있도록 export 해준다.
      ```
      export const Name = createContext(null);
      ```
      2. 조회 파일에 들어가서, 생성 파일의 context 변수를 import 해준다.
      ```
      import { Name } from "파일경로";
      ```

  - 생성 컴포넌트에서 `Provider` 컴포넌트를 통해 context 값을 지정하고, 렌더링 할 컴포넌트들을 감싸준다.
    - `value` 값을 지정하지 않을 경우, 지정한 기본 값이 넘겨진다.
      ```
      function MainComponent() {
        return (
          <Name.Provider value="백괴">
            <PassComponent01 />
          </Name.Provider>
        );
      }
      ```
  - 조회 컴포넌트에 변수를 생성하여 `useContext` 함수를 넣어준다. 인자에는 context 변수를 넣어준다.

    ```
    function LookupComponent() {
      const Name = useContext(Name);
      return <>저의 이름은 {Name} 입니다.</>;
    }
    ```

  - 완성된 예제 코드(생성 파일 **=** 조회 파일)

    ```
    import React, { createContext, useContext } from "react";
    const Name = createContext(null);

    // context를 사용하지 않는다면? 여러 props를 거쳐서 복잡하게 값을 넘겨야 한다.

    // context 값 조회 컴포넌트
    function LookupComponent() {
      const Name = useContext(Name);
      return <>저의 이름은 {Name} 입니다.</>
    }

    // 두 번째 경유 컴포넌트
    function PassComponent02() {
      return <LookupComponent />
    }

    // 첫 번째 경유 컴포넌트
    function PassComponent01() {
      return <PassComponent02 />
    }

    // 메인 컴포넌트
    function MainComponent() {
      return (
        <Name.Provider value="백괴">
          <PassComponent01 />
        </Name.Provider>
      );
    }

    export default MainComponent;
    ```

    ```
    결과 : 저의 이름은 백괴 입니다.
    ```

<br>

- `useReducer()` 활용
  - context 값을 `dispatch` 함수로 설정해 주면, 전역적으로 해당 함수를 호출하여 상태를 관리할 수 있게 된다.
    ```
    const [state, dispatch] = useReducer(reducer, initialState);
    ...
    return (
      <UserDispatch.Provider value={dispatch}>
        <PassComponent />
      </UserDispatch.Provider>
    )
    ```
