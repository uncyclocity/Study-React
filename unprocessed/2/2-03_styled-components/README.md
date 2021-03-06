# ์ฑํฐ 2-3 : styled-components

> ์ฐธ๊ณ  <br> https://react.vlpt.us/styling/03-styled-components.html <br> https://agal.tistory.com/170 <br> https://brunch.co.kr/@99-life/3

#### ๐ ์ฃผ๋ก ๋ฐฐ์ด ๋ด์ฉ

- styled-components ๊ธฐ๋ณธ ๊ฐ๋

  - CSS ์ฝ๋๋ฅผ JS ๋ด๋ถ์์ ์ธ ์ ์๋๋ก ํ๋ **CSS in JS** ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ค.
  - ์ํ๋ ์คํ์ผ์ **์ปดํฌ๋ํธ ํํ**๋ก ์ฌ์ฉํ  ์ ์๋ค.
  - ๋ฐฑํฑ(`` ` ``)์ ์ด์ฉํ <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals">Tagged Tamplate Literal</a> ๋ฌธ๋ฒ์ ์ฌ์ฉํ๋ฉฐ, ์กฐ๊ฑด๋ถ ์คํ์ผ๋ง์ด๋ ๋ณ์ ๊ฐ ์ฐธ์กฐ ์์๋ `${}` ์์ ํด๋น ๋ก์ง์ ์๋ ฅํด์ผ ํ๋ค.
  - Sass์ฒ๋ผ ์ค์ฒฉ์ ์ฌ์ฉํ  ์ ์์ผ๋ฉฐ, ์ด ๊ฒฝ์ฐ ๋์ผํ๊ฒ `&`๊ฐ ๋ถ๋ชจ ์ ํ์๋ฅผ ์๋ฏธํ๊ฒ ๋๋ค.

<br>

- ๊ธฐ๋ณธ์ ์ธ ์ฌ์ฉ๋ฒ

  - styled-components ์ค์น ํ import ํ์ฌ ์ฌ์ฉํ๋ค.

    ```
    $ yarn add styled-components
    ```

    ```
    import styled from "styled-components";
    ```

  - ํน์  ๋ณ์ ๋ด๋ถ์ Tagged Tamplate Literal ๋ฌธ๋ฒ์ ์ฌ์ฉํ์ฌ ์คํ์ผ ์ฝ๋๋ฅผ ์๋ ฅํ๋ค.

    - `styled.ํ๊ทธ๋ช` ํํ๋ก ์์ฑํ๊ณ , ๋ฐฑํฑ ์์ ๋ด์ฉ์ ์๋ ฅํ๋ค.
    - styled-components๋ฅผ ํตํด ์คํ์ผ์ ์ค์ ํ ๋ณ์์ ์ด๋ฆ์ **์์ฑ ๋ ์ปดํฌ๋ํธ์ ์ด๋ฆ๊ณผ ๋์ผ**ํ๋ค.

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
        // ๋ณ์์ ์ด๋ฆ๊ณผ ์ปดํฌ๋ํธ์ ์ด๋ฆ์ ๋์ผํ๋ค.
        return <Border> {children} </Border>;
      }

      export default Example01;
      ```

  - ์กฐ๊ฑด์ ๋ฐ๋ผ ๋ค๋ฅธ ์คํ์ผ ์ฝ๋๋ฅผ ๋ฐํํ๋ ค๋ฉด `css`๋ฅผ importํ์ฌ ์ฌ์ฉํ๋ค.

    ```
    // css๋ฅผ importํ์๋ค.
    import styled, { css } from "styled-components";

    const StyledBorder = styled.div`
      width: 100px;
      margin: 0 auto;
      margin-top: 4rem;
      padding: 1rem;

      ${({color}) => color ?
        css`border: 1px solid ${color}` :
        css`border: 1px solid black`
        // props.color ๊ฐ์ ๋ฐ๋ฅธ ๋ฆฌํด
      }
    `;

    function Example01({ children }) {
      return <StyledBorder color="#f06595"> {children} </StyledBorder>;
    }

    export default Example01;
    ```

<br>

- polished

  - CSS in JS์์ Sass์ ๋น์ทํ๊ฒ **์คํ์ผ ๊ด๋ จ ์ ํธ ํจ์**๋ฅผ ์ฌ์ฉํ  ์ ์๋๋ก ํด์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ค.
  - ํจ์ ๋ชฉ๋ก์ <a href="https://polished.js.org/docs/">์ฌ๊ธฐ</a>๋ฅผ ์ฐธ๊ณ ํ๋ฉด ๋๋ค.
  - ์๋ํํฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ฏ๋ก ๋ณ๋์ ์ค์น๋ฅผ ํตํด ์ฌ์ฉํ๋ค.
    ```
    $ yarn add polished
    ```
  - ์ฌ์ฉ ์์

    ```
    import styled from "styled-components";

    // polished ์ ํธ ํจ์ ไธญ lighten, darken ํจ์๋ฅผ ๊ฐ์ ธ์ด
    import { lighten, darken } from "polished";

    const StyledButton = styled.button`
      (์ผ๋ถ ์ฝ๋ ์๋ต..)
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
          <StyledButton>๋ฒํผ์๋๋ค.</StyledButton>
          <span>๋ง์ฐ์ค๋ฅผ ๊ฐ๋ค๋๋ฉด ๋ฐ์์ง๊ณ , ๋๋ฅด๋ ์๊ฐ ์ด๋์์ง๋๋ค.</span>
        </div>
      );
    }

    export default Example02;
    ```

<br>

- ThemeProvider

  - **์ ์ญ์ผ๋ก ์ฌ์ฉํ  ๊ฐ**์ ์ง์ ํ  ์ ์๋๋ก ํ๋ styled-component์ ๋ด์ฅ ์ปดํฌ๋ํธ์ด๋ค.
  - <a href="https://github.com/uncyclocity/study_react/tree/main/1-22_context-dispatch">context API</a>์ `Provider` ์ปดํฌ๋ํธ์ ๋น์ทํ ๋ฐฉ์์ผ๋ก ๋ ๋๋ง ํ  ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ธ๋ ํํ๋ก ์ฌ์ฉํ๋ฉฐ, ์ฌ์ฉํ  ๊ฐ์ ์ง์ ํ์ฌ props๋ก ๋๊ฒจ์ค๋ค.
  - ์ด๋ ๊ฒ ๋๊ธด ๊ฐ์ styled-component๋ฅผ ํตํด ์์ฑํ ์คํ์ผ๋ง ์ปดํฌ๋ํธ์์ ์กฐํํ  ์ ์๋ค.
  - ์ฌ์ฉ ์์

    ```
    import Example02 from "./components/Example02";

    // ThemeProvider์ปดํฌ๋ํธ ๊ฐ์ ธ์ค๊ธฐ
    import styled, { ThemeProvider } from "styled-components";

    function App() {
      return (
        // props๋ก ์ฌ์ฉํ  ๊ฐ๋ค์ด ๋ด๊ธด ๊ฐ์ฒด๋ฅผ ๋ฃ์ด ์ฃผ์๋ค.
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

    //์ด์ ๊ฐ์ด props.theme๋ฅผ ๋ฐ์์ ์ฌ์ฉํ  ์ ์๋ค.
    const StyledButton = styled.button`
      (์ผ๋ถ ์ฝ๋ ์๋ต..)

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
          <StyledButton>๋ฒํผ์๋๋ค.</StyledButton>
          <span>๋ง์ฐ์ค๋ฅผ ๊ฐ๋ค๋๋ฉด ๋ฐ์์ง๊ณ , ๋๋ฅด๋ ์๊ฐ ์ด๋์์ง๋๋ค.</span>
        </div>
      );
    }

    export default Example02;
    ```

<br>

- [๋ฒ์ธ] keyframe์ ์ด์ฉํ ํธ๋์ง์ ํจ๊ณผ ๊ตฌํ

  - CSS์ ํธ๋์ง์์ **`@keyframes` ๊ท์น**์ ํตํด ๋ณด๋ค ์ธ๋ฐํ๊ฒ ๊ด๋ฆฌํ  ์ ์๋ค.

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

  - styled-component์์๋ `styled-components/keyframes`๋ฅผ importํ์ฌ ํคํ๋ ์์ ์์ฑํ๋ค.

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

  - ํคํ๋ ์์ ์ด์ฉํ ์ ๋๋ฉ์ด์ ์ ์ฉ ์์  (styled-components ๋ฌธ๋ฒ)

    - `animation` ๊ฐ ์์ฑ์ ๋ํ ์ค๋ช์ <a href="https://brunch.co.kr/@99-life/3">์ฌ๊ธฐ</a> ์ฐธ๊ณ 
    - ์์  ์ฝ๋ : ๋ค์ด์ผ๋ก๊ทธ ์ฐฝ์ ์ฌ๋ผ์ด๋ ์/๋ค์ด ๊ตฌํ

      - ์ฌ๋ผ์ด๋ ์

        ##### `App.js`

        ```
        import React from "react";
        import Dialog from "./components/Dialog";

        function App() {
          // ๋ค์ด์ผ๋ก๊ทธ ์ด๊ธฐ
          const onOpen = () => {
            setVisible(true);
          };

          return (
            <>
              <button onClick={onOpen}>๋ค์ด์ผ๋ก๊ทธ ์ด๊ธฐ</button>
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
          (๋ค์ด์ผ๋ก๊ทธ ์ฐฝ ์์ฒด ๋ฐ h3 ํ๊ทธ์ ๋ํ ์คํ์ผ๋ง ์ฝ๋ ์๋ต...)

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

      - ์ฌ๋ผ์ด๋ ์ + ๋ค์ด : ๋์ ๊ตฌ๋ถํ๊ธฐ ์ํด `useEffect` ๋ฐ ์ํ๊ฐ์ด ํ์ํ๋ค.

        ##### `App.js`

        ```
        import React, { useState } from "react";
        import Dialog from "./components/Dialog";

        function App() {
          // ๋ค์ด์ผ๋ก๊ทธ ํ์ ์ฌ๋ถ์ด๋ฉฐ, Dialog ์ปดํฌ๋ํธ์ useEffect์ deps์ ๋ค์ด๊ฐ
          const [visible, setVisible] = useState(false);

          // ๋ค์ด์ผ๋ก๊ทธ ์ด๊ธฐ
          const onOpen = () => {
            setVisible(true);
          };

          // ๋ค์ด์ผ๋ก๊ทธ ๋ซ๊ธฐ
          const onClose = () => {
            setVisible(false);
          };

          return (
            <>
              <button onClick={onOpen}>๋ค์ด์ผ๋ก๊ทธ ์ด๊ธฐ</button>
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
          (๋ค์ด์ผ๋ก๊ทธ ์ฐฝ ์์ฒด ๋ฐ h3 ํ๊ทธ์ ๋ํ ์คํ์ผ๋ง ์ฝ๋ ์๋ต...)

          animation-duration: 0.25s;
          animation-name: ${slideUp};
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;

          ${
            /* visible์ ๋ฐ์ ๊ฐ์ธ disappear์ด true์ด๋ฉด
            slideDown ์ ๋๋ฉ์ด์์ผ๋ก ๋ณ๊ฒฝ */
            props =>
            props.disappear &&
            css`
              animation-name: ${slideDown};
            `}
        `;

        function Dialog({ visible, onClose }) {
          // ์ ๋๋ฉ์ด์ ์ฌ์ ์ํ, ์ฌ์ ์ดํ ๋ฐํ ๊ฐ์ ๊ฒฐ์ ํ๋ ์ํ
          const [animate, setAnimate] = useState(false);
          const [localVisible, setLocalVisible] = useState(visible);

          /*
            ์ ๋๋ฉ์ด์ ์ฌ์ ์ํ๋ฅผ ์ ์ดํ๋ useEffect
            - visible ๋ณ๊ฒฝ์ด ๊ฐ์ง๋๋ฉด ์คํํ๋ค.
            - visible๊ณผ localVisible ๊ฐ์ด ๋ค๋ฅด๋ฉด ์ ๋๋ฉ์ด์์ ์ฌ์ํ๋ค.
            - 250ms๊ฐ์ ์ ๋๋ฉ์ด์ ์ฌ์ ์ดํ, localVisible์ visible๊ณผ ๊ฐ๊ฒ ํ๋ค.
              ๐ ๋ฐ๋ localVisible ๊ฐ์ T/F์ ๋ฐ๋ผ ๋ฐํ ๊ฐ์ด ๋ฌ๋ผ์ง๋ค.
          */
          useEffect(() => {
            if(visible === !localVisible) {
              setAnimate(true);
              setTimeOut(() => setAnimate(false), 250);
            }
            setLocalVisible(visible);
          }, [visible, localVisible]);

          // localVisible์ด False์ด๋ฉฐ ์ ๋๋ฉ์ด์ ์ฌ์ ์ค X => null ๋ฐํ์ผ๋ก ๋ค์ด์ผ๋ก๊ทธ ์ฌ๋ผ์ง
          if(!localVisible && !animate)
            return null;

          return (
            // visible์ ๋ฐ์  ๊ฐ์ ๋๊ฒจ ๋ค์ ์ํ ์์์ ๋ช์ํ๋ค.
            <DialogBlock disappear={!visible}>
              <h3>hello world!</h3>
              <button onClick={onClose}>๋ซ๊ธฐ</button>
            </DialogBlock>
          );
        }

        export default Dialog;
        ```
