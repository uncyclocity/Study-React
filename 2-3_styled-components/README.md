# 챕터 2-3 : styled-components

> 참고 : https://react.vlpt.us/styling/03-styled-components.html

#### 📕 주로 배운 내용

- styled-components 기본 개념

  - CSS 코드를 JS 내부에서 쓸 수 있도록 하는 **CSS in JS** 라이브러리이다.
  - 원하는 스타일을 **컴포넌트 형태**로 사용할 수 있다. props 또한 받을 수 있다.
  - 백틱(`` ` ``)을 이용한 Tagged Tamplate Literal 문법을 사용하며, 조건부 스타일링이나 변수 값 참조 시에는 `${}` 안에 해당 로직을 입력해야 한다.
  - Sass처럼 중첩을 사용할 수 있으며, 이 경우 동일하게 `&`가 부모 선택자를 의미하게 된다.

<br>

- 기본적인 사용법

  - styled-components 설치 후 import 하여 사용한다.

    ```
    $ yarn add styled-components
    ```

    ```
    import styled from "styled-component";
    ```

  - 특정 변수 내부에 Tagged Tamplate Literal을 사용하여 스타일 코드를 입력한다.

    - `styled.원하는 태그 ` 형태로 작성하고, 백틱 안에 내용을 입력한다.
    - 스타일을 설정한 변수의 이름 **=** 생성 된 컴포넌트의 이름

      ```
      import styled from "styled-component";

      const Border = styled.div`
        width: 100px;
        margin: 0 auto;
        margin-top: 4rem;
        border: 1px solid grey;
        padding: 1rem;
      `;

      function Example01({ children }) {
        return <Border> {children} </Border>;
      }

      export default Example01;
      ```

  - 조건에 따라 다른 스타일 코드를 반환하려면 `css`를 import하여 사용한다.

    ```
    // css를 import하였다.
    import styled, { css } from "styled-component";

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
  - 외부 라이브러리이므로 별도의 설치를 통해 사용한다.
    ```
    $ yarn add polished
    ```
  - 사용 예시

    ```
    import styled from "styled-component";

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
  - 렌더링 할 컴포넌트를 감싸서, 사용할 값을 props로 넘겨줄 수 있다.
  - 이렇게 넘긴 값은 styled-component를 통해 생성한 스타일링 컴포넌트에만 넘겨진다.
  - 사용 예시

    ```
    import Example02 from "./components/Example02";

    // ThemeProvider컴포넌트 가져오기
    import styled, { ThemeProvider } from "styled-component";

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
    import styled from "styled-component";
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

> To be continued
