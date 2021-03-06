# ์ฑํฐ 2-2 : CSS Module

> ์ฐธ๊ณ  : https://react.vlpt.us/styling/02-css-module.html

#### ๐ ์ฃผ๋ก ๋ฐฐ์ด ๋ด์ฉ

- CSS Module ๊ธฐ๋ณธ ๊ฐ๋

  - **๊ณ ์  ํด๋์ค๋ช**์ ์ฌ์ฉํ  ์ ์๋๋ก ํ๋ ์๋ํํฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
  - ํด๋์ค๋ช์ ํด์ฌ๊ฐ์ ๋ถ์ฌ์ฃผ๋ฏ๋ก ์ค๋ณต ๋ ํด๋์ค๋ช์ผ๋ก ์ธํ ์ถฉ๋์ ๋ฐฉ์งํ  ์ ์๋ค.
  - ๊ธฐ์กด ๋ ๊ฑฐ์ ํ๋ก์ ํธ์ ๋ฆฌ์กํธ๋ฅผ ๋์ํ  ๋ ์ ์ฉํ๋ค.
  - webpack ๊ธฐ๋ณธ ๋ด์ฅ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๊ธฐ์ CRA ํ๋ก์ ํธ์์ ์ค์น ์์ด ์ฌ์ฉ ๊ฐ๋ฅํ๋ค.

<br>

- ์ฌ์ฉํ๊ธฐ

  - CSS ํ์ผ์ ํ์ฅ์๋ฅผ `.module.css`๋ก ์ค์ ํ์ฌ ์ฌ์ฉํ  ์ ์๋ค.
  - ์คํ์ผ์ํธ ๋ด๋ถ์ ์์ฑํ ๊ฐ ํด๋์ค ๋ณ ์คํ์ผ ์ฝ๋๋ฅผ, ํด๋์ค๋ช ์ง์  ์ ์ง์ ํ์ฌ ์ฌ์ฉํ๋ค.

    ##### `PinkBg.module.css`

    ```
    .pinkBg {
      background: #ff80c0;
    }
    .pinkBg h1 {
      font-weight: bold;
    }
    ```

    ##### `PinkBg.js`

    ```
    import style from "./PinkBg.module.css";

    function PinkBg({ children }) {
      return (
        // ํด๋์ค๋ช ์์ฑ ๋ฐฉ๋ฒ
        <div className={style.pinkBg}>
          <h1>{children}</h1>
        </div>
      );
    }
    ```

  - Sass ๋ํ ์ฌ์ฉ ๊ฐ๋ฅํ๋ค. Scss์ ๊ฒฝ์ฐ ํ์ฅ์๋ฅผ `.module.scss`๋ก ์ง์ ํ๋ฉด ๋๋ค.

    ##### `PinkBg.module.scss`

    ```
    $pink: #ff80c0;

    .pinkBg {
      background: $pink;

      h1 {
        font-weight: bold;
      }
    }
    ```

<br>

- classnames ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ด์ฉํ ๋ฐ์ธ๋ฉ

  - <a href="https://github.com/uncyclocity/study_react/tree/main/2-1_sass">์ด์ ์ ์ฌ์ฉํ๋ classnames ๋ผ์ด๋ธ๋ฌ๋ฆฌ</a>๋ฅผ ์ด์ฉํ์ฌ ์คํ์ผ์ํธ๋ฅผ ๋ฐ์ธ๋ฉ์ ์์ผ์ฃผ๋ฉด, ํด๋์ค๋ช๋ง ๋ช์ํ์ฌ ์ ์ฉํ  ์ ์๋ค.
  - import ํ  ๋ `classnames/bind`๋ฅผ ๊ฐ์ ธ์ด์ผ๋ก์จ ์ฌ์ฉํ  ์ ์๋ค.

    ```
    import styles from "./PinkBg.module.css";
    import classNames from "classnames/bind";

    // ๋ณ์์ ๋ฐ์ธ๋ฉ ์ ์ฉ
    const cx = classNames.bind(styles);

    function PinkBg({ children }) {
      return (
        // ํ์ธต ๊ฐ๊ฒฐํด์ง ํด๋์ค๋ช ์ง์ 
        <div className={cx(pinkBg)}>
          <h1>{children}</h1>
        </div>
      );
    }

    export default PinkBg;
    ```

<br>

- [๋ฒ์ธ] react-icon : ์ปดํฌ๋ํธ ํ์์ผ๋ก ์์ด์ฝ ๋ถ๋ฌ์ค๊ธฐ

  ```
  $ yarn add react-icons
  ```

  - ์์ ๋์์ธ์ด ์ ์ฉ ๋ ์์ด์ฝ๋ค์ ์ปดํฌ๋ํธ ํํ๋ก ์ฌ์ฉํ  ์ ์๋ค.
  - <a href="https://react-icons.github.io/react-icons">๊ณต์ ๋ฌธ์</a>์์ ์ํ๋ ์์ด์ฝ์ ์ ํํ์ฌ, ์ด๋ฅผ ์ปดํฌ๋ํธ๋ก ์ ์ฉํ๋ฉด ๋๋ค.

    ##### ์ฌ์ฉ ์์ : ๋จธํ๋ฆฌ์ผ ์ฒดํฌ๋ฐ์ค ์ ์ฉํ๊ธฐ

    ```
    import styles from "./CheckBox.module.css";

    // ๋จธํ๋ฆฌ์ผ ์์ด์ฝ(react-icons/md)์ ์ฒดํฌ๋ฐ์ค ON/OFF ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ ธ์ด
    import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

    // props : ์ฒดํฌ๋ฐ์ค ์ฒดํฌ ์ฌ๋ถ, ๋๋ ์ ๋ checked๊ฐ ๋ฐ๋๋ ํจ์
    function CheckBox({checked, onClick}) {
      return (
        <div>
          <input type="checkbox" className={styles.hidden_cb} onClick={onClick}/>
          {
            // ๊ฐ ์ปดํฌ๋ํธ์ ๋ง์ถคํ ์คํ์ผ์ ์ ์ฉํ  ์ ์๋ค.
            // ex) ์๊น(color), ๋๋น ๋ฐ ๋์ด ๋ฑ...
            checked ?
            <MdCheckBox style={style.cb_true}/> :
            <MdCheckBoxOutlineBlank style={style.cb_false}/>
          }
        </div>
      );
    }

    export default CheckBox;
    ```
