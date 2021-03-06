# 2. JSX์ ํน์ฑ

> _References_ <br> https://react.vlpt.us/basic/04-jsx.html

## ๐ ์ฃผ๋ก ๋ฐฐ์ด ๋ด์ฉ

- ### JSX ํ๊ทธ ๊ธฐ๋ณธ ๊ท์น

  - ํ๊ทธ๋ ํญ์ **์ด๋ฆผ-๋ซํ์ด ํ์คํด์ผ ํ๋ค.**
    ```javascript
    // hr ํ๊ทธ๊ฐ ๋ซํ์์ง ์์ผ๋ฏ๋ก ์๋ฌ
    return (
      <div>
        <p>Hello World!</p>
        <hr>
      </div>
    );
    ```
    ๐ ์ด๋ฆผ-๋ซํ์ ์ผ์ผ์ด ์จ์ฃผ๊ธฐ ๊ณค๋ํ๋ค๋ฉด, JSX์ **Self Closing(`<div />`) ๋ฌธ๋ฒ**์ ํ์ฉํ  ์ ์๋ค.
    ```javascript
    return (
      <div>
        <p>Hello World!</p>
        <hr />
      </div>
    );
    ```
  - ๋ ๊ฐ ์ด์์ ํ๊ทธ๋ **ํญ์ ํ๋์ ํ๊ทธ๋ก ๊ฐ์ธ์ ธ์ผ๋ง ํ๋ค.**

    ```javascript
    return (
      <div>
        <Component />
        <Component>๋ด์ฉ</Component>
      </div>
    );
    ```

    ```javascript
    // ์๋ฌ
    return (
      <Component />
      <Component>๋ด์ฉ</Component>
    );
    ```

  - div ๋์  **Fragment ํ๊ทธ(`<></>`)** ๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.

    ```javascript
    return (
      <>
        <Component />
        <Component>๋ด์ฉ</Component>
      </>
    );
    ```

  - JSX ๋ด๋ถ์์ JS๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด **์ค๊ดํธ๋ก ๊ฐ์ผ๋ค.**

    ```javascript
    const name = "Uncyclocity";
    return <div>{name}</div>;
    ```

    ```javascript
    const myName = "Uncyclocity";
    const introduce = (name) => alert(`์  ์ด๋ฆ์ ${name}์๋๋ค.`);

    return <button onClick={() => introduce(myName)}>๋ฒํผ</button>;
    ```

<br>

- ### JSX์์์ ์คํ์ผ๋ง

  - ์ธ๋ผ์ธ ์คํ์ผ

    - **๊ฐ์ฒด ํํ**๋ก ์์ฑํ๋ค.
    - value ๊ฐ์ผ๋ก ์ซ์๋ง ์๋ ฅํ๋ฉด, ํฝ์ ๋จ์๋ก ์ค์ ๋๋ค. <br> ๊ทธ ์ธ์ ๋จ์๋ ๋ฌธ์์ด๋ก ์๋ ฅํด์ผํ๋ค. ใ์) `fontSize: "3rem"`ใ
    - `background-color`์ ๊ฐ์ด `-`๊ฐ ๋ค์ด๊ฐ ์์ฑ์ `backgroundColor`๊ณผ ๊ฐ์ด CamelCase ํํ๋ก ์์ฑํด์ผ ํ๋ค.

      ```javascript
      const style = {
        fontSize: 25, // ๊ธฐ๋ณธ ๋จ์๋ px์ด๋ค.
        color: "#47C83E",

        backgroundColor: "white", // background-color โก backgroundColor
        boxShadow: "0px 0px 30px #86E57F",
        borderRadius: "30px",

        width: "230px",
        padding: "4rem", // px๊ฐ ์๋ ๋ค๋ฅธ ๋จ์๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด ๋ฌธ์์ด๋ก ์ง์ ํด์ผํ๋ค.
      };
      return <div style={style}>๋ด์ฉ</div>;
      ```

      ```javascript
      const color = "pink";

      /* ๊ฐ์ฒด ๋ฆฌํฐ๋ด ๋ฌธ๋ฒ์ ๋ฐ๋ผ, ๊ฐ์ฒด์ ๋ณ์๋ง ๋ฃ๋๋ผ๋
      ๋ณ์์ ์ด๋ฆ์ด ์คํ์ผ ์์ฑ์ ์ด๋ฆ์ผ ๊ฒฝ์ฐ ์คํ์ผ๋ง์ด ์ด๋ฃจ์ด์ง๋ค. */
      return <div style={{ color }}>๋ด์ฉ</div>;
      ```

  - ์ธ๋ถ ์คํ์ผ์ํธ๋ฅผ importํ์ฌ ์ฌ์ฉํ  ์ ์๋ค.

    ```javascript
    import "./Component.css";
    ```

  - styled-components์ ๊ฐ์ **CSS in JS** ๊ธฐ์  ๋ํ ์ฌ์ฉํ  ์ ์๋ค.

  - class๋ฅผ ์ค์ ํ  ๋, ์์ฑ๋ช์ `class=`๊ฐ ์๋, **`className=`** ์ด๋ค.

    ```javascript
    <div className="main_page" />
    ```

  <br>
  
- ### JSX์์์ ์ด๋ฒคํธ ํธ๋ค๋ง

  ```javascript
  const greeting = () => {
    console.log("Hello World");
  };

  return <button onClick={greeting}></button>;
  ```

  - JSX์์์ ์ด๋ฒคํธ ์์ฑ๋ช์ **`on` ๋ค์์ ๋ฌธ์๋ฅผ ๋๋ฌธ์๋ก ํ๊ธฐ**ํ๋ค.

    `onclick` โก๏ธ `onClick`

  - `์ด๋ฒคํธ์์ฑ={์คํํ  ์ฝ๋}` ํํ๋ก ์์ฑํ๋ค.

    > **Q.** ์ `onClick={onIncrease()}`๋ก ์์ฑํ์ง ์๋ ๊ฒ์ธ๊ฐ์๐ค
    >
    > **A.** ์์ ๊ฐ์ด **ํจ์ ์คํ ์ฝ๋**๋ฅผ ๋ฃ์ ๊ฒฝ์ฐ, ์ด๋ฒคํธ ๋ฐ์ ์ฌ๋ถ์ ์๊ด ์์ด **๋ ๋๋ง ์์ ์์ ํจ์ ํธ์ถ**์ด ์ด๋ฃจ์ด์ง๊ธฐ ๋๋ฌธ์ด๋ค.
    >
    > ํ๋ผ๋ฏธํฐ๋ฅผ ๋๊ฒจ์ฃผ์ด์ผ ํ๋ค๋ฉด? `onClick={() => onIncrease(num)}` ํํ๋ก ์์ฑํ๋ค.

<br>

- ### JSX์์์ ์ฃผ์

  - ์ฃผ์ ๋ํ JS ์ฝ๋์ฒ๋ผ **์ค๊ดํธ ๋ด๋ถ์ `/* */` ํํ๋ก ์์ฑ**ํ๋ค.
  - **์ฌ๋ ํ๊ทธ์ ๋ด๋ถ**์๋ ์ฃผ์์ ์์ฑํ  ์ ์๋ค.

    ```javascript
    return (
      <
        // ์ฌ๋ ํ๊ทธ์ ์ฃผ์์ ์์ฑํ  ์ ์๋ค.
      >
        {/* JSX ์ฝ๋ ๋ด์์์ ์ผ๋ฐ์ ์ธ ์ฃผ์ ์ฌ์ฉ ๋ฐฉ๋ฒ */}
      </>
    );
    ```
