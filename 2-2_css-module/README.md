# 챕터 2-2 : CSS Module

> 참고 : https://react.vlpt.us/styling/02-css-module.html

#### 📕 주로 배운 내용

- CSS Module 기본 개념

  - **고유 클래스명**을 사용할 수 있도록 하는 외부 라이브러리
  - 클래스명의 중복을 막아주므로, 기존 레거시 프로젝트에 리액트를 도입할 때 유용하다.
  - webpack 환경에서는 기본 내장 되어있다. CRA 프로젝트 또한 이에 해당된다.

<br>

- 사용하기

  - CSS 파일의 확장자를 `.module.css`로 설정하여 사용할 수 있다.
  - 스타일시트 내부에 작성한 각 클래스 별 스타일 코드를, 클래스명 지정 시 지정하여 사용한다.

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
        <div className={style.piknBg}>
          <span>{children}</span>
        </div>
      );
    }
    ```

> To be continued
