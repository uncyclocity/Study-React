# 챕터 2-1 : Sass

> 참고 <br> https://react.vlpt.us/styling/01-sass.html <br> https://velopert.com/1712

#### 📕 주로 배운 내용

- Sass 기본 개념

  - 컴파일러를 통해 브라우저에서 사용할 수 있는 일반 CSS 문법으로 변환하는 **CSS 전처리기**이다.
  - 변수, 재사용 가능 코드 생성(`mixin`), 내장 함수 등을 통해 편리한 스타일링이 가능하며, 코드의 가독성을 높여준다.
  - Scss : **CSS와 동일한 문법**으로 Sass의 특별한 기능을 사용할 수 있으며, 현재 Sass의 주 문법이다.<br>

<br>

- 시작하기

  - 외부 라이브러리이므로 설치는 필수이다.
    ```
    $yarn add node-sass
    ```
  - Scss 파일의 확장자는 `.scss` 이다.

<br>

- CSS 대비 Scss의 추가된 문법

  - 한줄 주석
    ```
    /* CSS는 여러 줄 주석만 지원한다. */
    // Sass에서는 한줄 주석도 사용할 수 있다.
    ```
  - 변수 선언 및 사용

    - **스타일링에 사용되는 값**을 넣을 수 있다.
    - 기본적으로, 특정 선택자 내부에서 선언한 변수는 해당 선택자에서만 사용 가능하다.

      ```
      $color: #333;

      body {
        $color: #eee;
        background; $color; // #eee
      }

      .example01 {
        background: $color; // #333
      }
      ```

    - 선택자 내부에서 변수를 전역으로 선언하려면 `!global` 플래그 사용한다.

      ```
      $color: #333;

      body {
        $color: #eee !global;
        background; $color; // #eee
      }

      .example01 {
        background: $color; // #eee
      }
      ```

  - 수학 연산자를 통한 값 계산 가능

    - 사칙 연산에 사용하는 수학 연산자(`%` 포함)를 사용할 수 있다.
    - `==`, `!=` 또한 사용할 수 있다.
    - `+`, `-` 연산자 사용 시, 상호간 단위는 통합하여야 한다.

      ```
      body {
        width: (600px + 1rem) * 100%; // 오류
      }
      ```

      ```
      body {
        width: (600px + 32px) * 100%; // 작동
      }
      ```

  - Scss 내장 함수의 존재

    - 아래 예시의 `lighten()`, `darken()` 이외에도 다양한 내장 함수가 있다.

      ```
      $blue = #228be6;

      .example01 {
        background: lighten($blue, 10%); // 파란색을 10% 밝게
      }

      .example02 {
        background: darken($blue, 10%); // 파란색을 10% 어둡게
      }
      ```

  - 중괄호 중첩 가능

    - 자식 선택자를 부모 선택자의 중괄호 내부에서 사용할 수 있다.
    - 부모 선택자는 `&`로 표현한다.

      ##### Scss

      ```
      .example {
        width: 100px;

        &.pinkBg {
          background: $pink;
        }
      }
      ```

      ##### CSS

      ```
      .example {
        width: 100px;
      }

      .example.pinkBg {
        background: $pink;
      }
      ```

  - 외부 Scss 파일 import 가능

    - `@import`를 통해 불러오기 할 수 있다.

    ```
    @importㅤ"style.scss";
    ```

    ```
    // 확장자 생략
    @importㅤ"style";
    ```

  - 반복되는 스타일링 코드를 재사용할 수 있도록 하는 Mixin

    - 스타일링에 쓰이는 값을 반환하는 함수와 달리, **스타일링 코드를 반환**한다.
    - 인자를 받을 수 있으며, 이를 통해 상황에 따라 다른 스타일을 적용할 수 있다.
    - `@mixin`으로 선언하고, `@include`로 이를 사용한다.

      ```
      @mixin font-option ($color, $size) {
        color: $color;
        font-size: $size;
      }

      h1 {
        @include font-option(green, 12px);
      }
      ```

  - 스타일링에 쓰이는 값을 반환하는 함수

    - 스타일링 시트를 반환하는 Mixin과는 달리, **스타일링에 쓰이는 값을 반환**한다.
    - `@function`으로 선언하고, 함수 내부에서 `@return`으로 값을 반환한다.

      ```
      @function calc-percent($num1, $num2) {
        @return ($num1 + $num2) * 100%;
      }

      .example {
        width: calc-percent(600px, 32px);
      }
      ```

<br>

- classnames 라이브러리

  - 조건부 스타일링 시, 보다 간편하게 클래스 네이밍이 가능하다.

    ```
    classNames("Button", "medium"); // "Button medium"

    classNames("Button", { fullWidth: true }); // "Button fullWidth"
    classNames("Button", { "fullWidth": true }); // "Button fullWidth"

    classNames("Button", { fullWidth: false }); // "Button"
    classNames("Button", { "fullWidth": false }); // "Button"

    classNames(null, false, undefined, 0, 1, "Button"); // "1 Button"
    ```

  - 외부 라이브러리이므로 설치 및 import가 필요하다.
    ```
    $yarn add classnames
    ```
    ```
    import classNames from "classnames";
    ```

<br>

- rest 연산자

  - 비구조 할당에서 객체/배열의 명시하지 않은 요소를 불러올 수 있다.

    ```
    const arr = [1, 2, 3, 4, 5];

    const [one, two, three, ...rest] = arr;

    console.log(rest);
    ```

    ```
    결과값 : [4, 5];
    ```

  - 아래의 예시와 같이, JSX 태그의 속성의 일부를 한번에 넣고 싶을 때도 사용할 수 있다.

    ```
    ...
    function App() {
      return (
        <Component
          onClick={() => console.log("onClick()")}
          onMouseMove={() => console.log("onMouseMove()")}
        >
          저는 자식입니다.
        </Component>
      );
    }
    ...
    ```

    ```
    ...
    // rest에는 props의 'onClick'과 'onMouseMove' 요소가 들어간다.
    function Component({ children, ...rest }) {
      return <button {...rest}>{children}</button>
    }
    ...
    ```
