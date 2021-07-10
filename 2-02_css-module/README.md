# 챕터 2-02 : CSS Module

> 참고 : https://react.vlpt.us/styling/02-css-module.html

#### 📕 주로 배운 내용

- CSS Module 기본 개념

  - **고유 클래스명**을 사용할 수 있도록 하는 외부 라이브러리
  - 클래스명에 해쉬값을 붙여주므로 중복 된 클래스명으로 인한 충돌을 방지할 수 있다.
  - 기존 레거시 프로젝트에 리액트를 도입할 때 유용하다.
  - webpack 기본 내장 라이브러리이기에 CRA 프로젝트에서 설치 없이 사용 가능하다.

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
        // 클래스명 작성 방법
        <div className={style.pinkBg}>
          <h1>{children}</h1>
        </div>
      );
    }
    ```

  - Sass 또한 사용 가능하다. Scss의 경우 확장자를 `.module.scss`로 지정하면 된다.

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

- classnames 라이브러리를 이용한 바인딩

  - <a href="https://github.com/uncyclocity/study_react/tree/main/2-1_sass">이전에 사용했던 classnames 라이브러리</a>를 이용하여 스타일시트를 바인딩을 시켜주면, 클래스명만 명시하여 적용할 수 있다.
  - import 할 때 `classnames/bind`를 가져옴으로써 사용할 수 있다.

    ```
    import styles from "./PinkBg.module.css";
    import classNames from "classnames/bind";

    // 변수에 바인딩 적용
    const cx = classNames.bind(styles);

    function PinkBg({ children }) {
      return (
        // 한층 간결해진 클래스명 지정
        <div className={cx(pinkBg)}>
          <h1>{children}</h1>
        </div>
      );
    }

    export default PinkBg;
    ```

<br>

- [번외] react-icon : 컴포넌트 형식으로 아이콘 불러오기

  ```
  $ yarn add react-icons
  ```

  - 예쁜 디자인이 적용 된 아이콘들을 컴포넌트 형태로 사용할 수 있다.
  - <a href="https://react-icons.github.io/react-icons">공식 문서</a>에서 원하는 아이콘을 선택하여, 이를 컴포넌트로 적용하면 된다.

    ##### 사용 예시 : 머태리얼 체크박스 적용하기

    ```
    import styles from "./CheckBox.module.css";

    // 머태리얼 아이콘(react-icons/md)의 체크박스 ON/OFF 컴포넌트를 가져옴
    import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

    // props : 체크박스 체크 여부, 눌렀을 때 checked가 바뀌는 함수
    function CheckBox({checked, onClick}) {
      return (
        <div>
          <input type="checkbox" className={styles.hidden_cb} onClick={onClick}/>
          {
            // 각 컴포넌트에 맞춤형 스타일을 적용할 수 있다.
            // ex) 색깔(color), 너비 및 높이 등...
            checked ?
            <MdCheckBox style={style.cb_true}/> :
            <MdCheckBoxOutlineBlank style={style.cb_false}/>
          }
        </div>
      );
    }

    export default CheckBox;
    ```
