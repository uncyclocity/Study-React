# 챕터 2-03 : styled-components

> 참고 <br> https://react.vlpt.us/styling/03-styled-components.html <br> https://agal.tistory.com/170 <br> https://brunch.co.kr/@99-life/3

#### 📕 주로 배운 내용

- styled-components 기본 개념

  - CSS 코드를 JS 내부에서 쓸 수 있도록 하는 **CSS in JS** 라이브러리이다.
  - 원하는 스타일을 **컴포넌트 형태**로 사용할 수 있다.
  - 백틱(`` ` ``)을 이용한 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals">Tagged Tamplate Literal</a> 문법을 사용하며, 조건부 스타일링이나 변수 값 참조 시에는 `${}` 안에 해당 로직을 입력해야 한다.
  - Sass처럼 중첩을 사용할 수 있으며, 이 경우 동일하게 `&`가 부모 선택자를 의미하게 된다.

<br>

- 기본적인 사용법

  - styled-components 설치 후 import 하여 사용한다.

    ```
    $ yarn add styled-components
    ```

    ```
    import styled from "styled-components";
    ```

  - 특정 변수 내부에 Tagged Tamplate Literal 문법을 사용하여 스타일 코드를 입력한다.

    - `styled.태그명` 형태로 작성하고, 백틱 안에 내용을 입력한다.
    - styled-components를 통해 스타일을 설정한 변수의 이름은 **생성 된 컴포넌트의 이름과 동일**하다.

      ```
      import styled from "styled-components";

      const Border = styled.div`
        width: 100px;
        margin: 0 auto;
        margin-top: 4rem;
        border: 1px solid grey;
        padding: 1rem;
      `;

      function Example01({ children }) {
        // 변수의 이름과 컴포넌트의 이름은 동일하다.
        return <Border> {children} </Border>;
      }

      export default Example01;
      ```

  - 조건에 따라 다른 스타일 코드를 반환하려면 `css`를 import하여 사용한다.

    ```
    // css를 import하였다.
    import styled, { css } from "styled-components";

    const StyledBorder = styled.div`
      width: 100px;
      margin: 0 auto;
      margin-top: 4rem;
      padding: 1rem;

      ${({color}) => color ?
        css`border: 1px solid ${color}` :
        css`border: 1px solid black`
        // props.color 값에 따른 리턴
      }
    `;

    function Example01({ children }) {
      return <StyledBorder color="#f06595"> {children} </StyledBorder>;
    }

    export default Example01;
    ```

<br>

- polished

  - CSS in JS에서 Sass와 비슷하게 **스타일 관련 유틸 함수**를 사용할 수 있도록 해주는 라이브러리이다.
  - 함수 목록은 <a href="https://polished.js.org/docs/">여기</a>를 참고하면 된다.
  - 서드파티 라이브러리이므로 별도의 설치를 통해 사용한다.
    ```
    $ yarn add polished
    ```
  - 사용 예시

    ```
    import styled from "styled-components";

    // polished 유틸 함수 中 lighten, darken 함수를 가져옴
    import { lighten, darken } from "polished";

    const StyledButton = styled.button`
      (일부 코드 생략..)
      background: #228be6;
      &:hover {
        background: lighten(0.1, #228be6);
      }
      &:active {
        background: darken(0.1, #228be6);
      }
    `;

    function Example02() {
      return (
        <div>
          <StyledButton>버튼입니다.</StyledButton>
          <span>마우스를 갖다대면 밝아지고, 누르는 순간 어두워집니다.</span>
        </div>
      );
    }

    export default Example02;
    ```

<br>

- ThemeProvider

  - **전역으로 사용할 값**을 지정할 수 있도록 하는 styled-component의 내장 컴포넌트이다.
  - <a href="https://github.com/uncyclocity/study_react/tree/main/1-22_context-dispatch">context API</a>의 `Provider` 컴포넌트와 비슷한 방식으로 렌더링 할 컴포넌트를 감싸는 형태로 사용하며, 사용할 값을 지정하여 props로 넘겨준다.
  - 이렇게 넘긴 값은 styled-component를 통해 생성한 스타일링 컴포넌트에서 조회할 수 있다.
  - 사용 예시

    ```
    import Example02 from "./components/Example02";

    // ThemeProvider컴포넌트 가져오기
    import styled, { ThemeProvider } from "styled-components";

    function App() {
      return (
        // props로 사용할 값들이 담긴 객체를 넣어 주었다.
        <ThemeProvider
          theme={{
            palette: {
              blue: "#228be6",
              pink: "#f06595"
            }
          }}>
          <Example02 />
        </ThemeProvider>
      );
    }

    export default App;
    ```

    ```
    import styled from "styled-components";
    import { lighten, darken } from "polished";

    //이와 같이 props.theme를 받아서 사용할 수 있다.
    const StyledButton = styled.button`
      (일부 코드 생략..)

      ${({theme}) => css`
        background: ${theme.blue};
        &:hover {
          background: lighten(0.1, ${theme.blue});
        }
        &:active {
          background: darken(0.1, ${theme.blue});
        }
      `}
    `;

    function Example02() {
      return (
        <div>
          <StyledButton>버튼입니다.</StyledButton>
          <span>마우스를 갖다대면 밝아지고, 누르는 순간 어두워집니다.</span>
        </div>
      );
    }

    export default Example02;
    ```

<br>

- [번외] keyframe을 이용한 트랜지션 효과 구현

  - CSS의 트랜지션은 **`@keyframes` 규칙**을 통해 보다 세밀하게 관리할 수 있다.

    ```
    @keyframes slideUp {
      from {
        transform: translateY(200px);
      }

      to {
        transform: translateY(0px);
      }
    }
    ```

  - styled-component에서는 `styled-components/keyframes`를 import하여 키프레임을 작성한다.

    ```
    import { keyframes } from "styled-components";
    ```

    ```
    const slideUp = keyframes`
      from {
        transform: translateY(200px);
      }

      to {
        transform: translateY(0px);
      }
    `

    const slideDown = keyframes`
      from {
        transform: translateY(0px);
      }

      to {
        transform: translateY(200px);
      }
    `
    ```

  - 키프레임을 이용한 애니메이션 적용 예제 (styled-components 문법)

    - `animation` 각 속성에 대한 설명은 <a href="https://brunch.co.kr/@99-life/3">여기</a> 참고
    - 예제 코드 : 다이얼로그 창의 슬라이드 업/다운 구현

      - 슬라이드 업

        ##### `App.js`

        ```
        import React from "react";
        import Dialog from "./components/Dialog";

        function App() {
          // 다이얼로그 열기
          const onOpen = () => {
            setVisible(true);
          };

          return (
            <>
              <button onClick={onOpen}>다이얼로그 열기</button>
              <Dialog />
            </>
          );
        }

        export default App;
        ```

        ##### `components/Dialog.js`

        ```
        import React from "react";
        import styled, { keyframes } from "styled-components";

        const slideUp = keyframes`...`;
        const slideDown = keyframes`...`;

        const DialogBlock = styled.div`
          (다이얼로그 창 자체 및 h3 태그에 대한 스타일링 코드 생략...)

          animation-duration: 0.25s;
          animation-name: ${slideUp};
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        `;

        function Dialog() {
          return (
            <DialogBlock>
              <h3>hello world!</h3>
            </DialogBlock>
          );
        }

        export default Dialog;
        ```

      - 슬라이드 업 + 다운 : 둘을 구분하기 위해 `useEffect` 및 상태값이 필요하다.

        ##### `App.js`

        ```
        import React, { useState } from "react";
        import Dialog from "./components/Dialog";

        function App() {
          // 다이얼로그 표시 여부이며, Dialog 컴포넌트의 useEffect의 deps에 들어감
          const [visible, setVisible] = useState(false);

          // 다이얼로그 열기
          const onOpen = () => {
            setVisible(true);
          };

          // 다이얼로그 닫기
          const onClose = () => {
            setVisible(false);
          };

          return (
            <>
              <button onClick={onOpen}>다이얼로그 열기</button>
              <Dialog visible={visible} onClose={onClose} />
            </>
          );
        }

        export default App;
        ```

        ##### `components/Dialog.js`

        ```
        import React, { useState, useEffect } from "react";
        import styled, { keyframes } from "styled-components";

        const slideUp = keyframes`...`;
        const slideDown = keyframes`...`;

        const DialogBlock = styled.div`
          (다이얼로그 창 자체 및 h3 태그에 대한 스타일링 코드 생략...)

          animation-duration: 0.25s;
          animation-name: ${slideUp};
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;

          ${
            /* visible의 반전값인 disappear이 true이면
            slideDown 애니메이션으로 변경 */
            props =>
            props.disappear &&
            css`
              animation-name: ${slideDown};
            `}
        `;

        function Dialog({ visible, onClose }) {
          // 애니메이션 재생 상태, 재생 이후 반환 값을 결정하는 상태
          const [animate, setAnimate] = useState(false);
          const [localVisible, setLocalVisible] = useState(visible);

          /*
            애니메이션 재생 상태를 제어하는 useEffect
            - visible 변경이 감지되면 실행한다.
            - visible과 localVisible 값이 다르면 애니메이션을 재생한다.
            - 250ms간의 애니메이션 재생 이후, localVisible을 visible과 같게 한다.
              👉 바뀐 localVisible 값의 T/F에 따라 반환 값이 달라진다.
          */
          useEffect(() => {
            if(visible === !localVisible) {
              setAnimate(true);
              setTimeOut(() => setAnimate(false), 250);
            }
            setLocalVisible(visible);
          }, [visible, localVisible]);

          // localVisible이 False이며 애니메이션 재생 중 X => null 반환으로 다이얼로그 사라짐
          if(!localVisible && !animate)
            return null;

          return (
            // visible의 반전 값을 넘겨 다음 수행 작업을 명시한다.
            <DialogBlock disappear={!visible}>
              <h3>hello world!</h3>
              <button onClick={onClose}>닫기</button>
            </DialogBlock>
          );
        }

        export default Dialog;
        ```
