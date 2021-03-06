# 8. useRef ํ์ฉํ๊ธฐ

> _References_ <br> https://react.vlpt.us/basic/10-useRef.html <br> https://react.vlpt.us/basic/12-variable-with-useRef.html

## ๐ ์ฃผ๋ก ๋ฐฐ์ด ๋ด์ฉ

- ### `useRef` Hook์ ๊ธฐ๋ฅ

  - **ํน์  DOM ์ ํ :** <br> Vanila JS์์ `getElement`์ ์ฌ์ฉํ๋ฏ, React์์๋ **ref๋ฅผ ์ฌ์ฉํ์ฌ ํน์  DOM์ ์ ํํ  ์ ์๋ค.**
  - **๋ณ์ ์ญํ  :** <br> state์๋ ๋ค๋ฅด๊ฒ **๋ฆฌ๋ ๋๋ง ์์ด ์๋ฐ์ดํธ ๋ ๊ฐ์ ์กฐํํ  ์ ์๋ ๋ณ์**๋ฅผ ๋ง๋ค ์ ์๋ค.

<br>

- ### ์์ํ๊ธฐ

  - `useRef`๋ฅผ import๋ฅผ ํด์ค๋ค.

    ```javascript
    import { useRef } from "react";
    ```

<br>

- ### ref๋ก ํน์  DOM ์ ํํ๊ธฐ

  - ํน์  ๋ณ์๋ฅผ ref ๊ฐ์ฒด๋ก ๋ง๋ ๋ค.

    ```javascript
    const refVal = useRef();
    ```

  - ์ปดํฌ๋ํธ์ JSX ์ฝ๋ ๋ด๋ถ์์ **์ ์ดํ๋ ค๋ DOM์ ํ๊ทธ์ `ref` ์์ฑ์ ์ง์ **ํ๋ค. <br> ์์ฑ ๊ฐ์ **ref ๊ฐ์ฒด๋ก ๋ง๋ค์ด ์ค ๋ณ์**๋ฅผ ๋ฃ์ด์ค๋ค.

    ```javascript
    return (
      ...
      <input name="example_input" ref={refVal} {...rest} />
      ...
    );
    ```

  - ์ดํ, ํ์์ ๋ฐ๋ผ ํด๋น ref ์์ฑ์ ์ง์ ํ DOM์ ์กฐ์ํ  ์ ์๋ค. <br> **ref ๊ฐ์ฒด์ `current`** ๊ฐ ํด๋น DOM์ ๊ฐ๋ฆฌํจ๋ค.

    ```javascript
    refVal.current.focus(); // example_input์ ํฌ์ปค์ค ์ง์ 
    ```

    ```javascript
    refVal.current.value = "Hello World!"; // example_input์ value๋ฅผ ๋ณ๊ฒฝ
    ```

<br>

- ### ref๋ฅผ ๋ณ์๋ก ํ์ฉํ๊ธฐ

  - ํน์  ๋ณ์๋ฅผ ref ๊ฐ์ฒด๋ก ๋ง๋ค๋, **๋ณ์์ ์ด๊ธฐ ๊ฐ**์ ์ธ์๋ก ๋๊ฒจ์ค๋ค.

    ```javascript
    // ์ด๊ธฐ ๊ฐ์ 0์ผ๋ก ์ค์ ํจ
    const refVal = useRef(0);
    ```

  - ๋ณ์๊ฐ์ **ref ๊ฐ์ฒด์ `current`** ๊ฐ ๊ฐ๋ฆฌํจ๋ค.

    ```javascript
    console.log("๊ฒฐ๊ณผ๊ฐ : " + refVal.current);
    ```

    **์ฝ์ ์ถ๋ ฅ ๊ฒฐ๊ณผ**

    ```bash
    ๊ฒฐ๊ณผ๊ฐ : 0
    ```

  - ์์ ํ๋๋ผ๋ ๋ฆฌ๋ ๋๋ง ๋์ง ์์ผ๋ฉฐ, **๋ฆฌ๋ ๋๋ง ์์ด ์๋ฐ์ดํธ๋ ๊ฐ ์กฐํ**๊ฐ ๊ฐ๋ฅํ๋ค.

    ```javascript
    refVal.current += 1;
    console.log("๊ฒฐ๊ณผ๊ฐ : " + refVal.current);
    ```

    **์ฝ์ ์ถ๋ ฅ ๊ฒฐ๊ณผ**

    ```bash
    ๊ฒฐ๊ณผ๊ฐ : 1
    ```
