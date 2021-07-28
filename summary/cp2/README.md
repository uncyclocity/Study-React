# 2. JSX의 특성

> _References_ <br> https://react.vlpt.us/basic/04-jsx.html

## 📕 주로 배운 내용

- ### JSX 태그 기본 규칙

  - 태그는 항상 **열림-닫힘이 확실해야 한다.**
    ```javascript
    // hr 태그가 닫혀있지 않으므로 에러
    return (
      <div>
        <p>Hello World!</p>
        <hr>
      </div>
    );
    ```
    👉 열림-닫힘을 일일이 써주기 곤란하다면, JSX의 **Self Closing(`<div />`) 문법**을 활용할 수 있다.
    ```javascript
    return (
      <div>
        <p>Hello World!</p>
        <hr />
      </div>
    );
    ```
  - 두 개 이상의 태그는 **항상 하나의 태그로 감싸져야만 한다.**

    ```javascript
    return (
      <div>
        <Component />
        <Component>내용</Component>
      </div>
    );
    ```

    ```javascript
    // 에러
    return (
      <Component />
      <Component>내용</Component>
    );
    ```

  - div 대신 **Fragment 태그(`<></>`)** 를 사용할 수 있다.

    ```javascript
    return (
      <>
        <Component />
        <Component>내용</Component>
      </>
    );
    ```

  - JSX 내부에서 JS를 사용하려면 **중괄호로 감싼다.**

    ```javascript
    const name = "Uncyclocity";
    return <div>{name}</div>;
    ```

    ```javascript
    const myName = "Uncyclocity";
    const introduce = (name) => alert(`제 이름은 ${name}입니다.`);

    return <button onClick={() => introduce(myName)}>버튼</button>;
    ```

<br>

- ### JSX에서의 스타일링

  - 인라인 스타일

    - **객체 형태**로 작성한다.
    - value 값으로 숫자만 입력하면, 픽셀 단위로 설정된다. <br> 그 외의 단위는 문자열로 입력해야한다. 「예) `fontSize: "3rem"`」
    - `background-color`와 같이 `-`가 들어간 속성은 `backgroundColor`과 같이 CamelCase 형태로 작성해야 한다.

      ```javascript
      const style = {
        fontSize: 25, // 기본 단위는 px이다.
        color: "#47C83E",

        backgroundColor: "white", // background-color ➡ backgroundColor
        boxShadow: "0px 0px 30px #86E57F",
        borderRadius: "30px",

        width: "230px",
        padding: "4rem", // px가 아닌 다른 단위를 사용하려면 문자열로 지정해야한다.
      };
      return <div style={style}>내용</div>;
      ```

      ```javascript
      const color = "pink";

      /* 객체 리터럴 문법에 따라, 객체에 변수만 넣더라도
      변수의 이름이 스타일 속성의 이름일 경우 스타일링이 이루어진다. */
      return <div style={{ color }}>내용</div>;
      ```

  - 외부 스타일시트를 import하여 사용할 수 있다.

    ```javascript
    import "./Component.css";
    ```

  - styled-components와 같은 **CSS in JS** 기술 또한 사용할 수 있다.

  - class를 설정할 때, 속성명은 `class=`가 아닌, **`className=`** 이다.

    ```javascript
    <div className="main_page" />
    ```

  <br>

- ### JSX에서의 주석

  - 주석 또한 JS 코드처럼 **중괄호 내부에 `/* */` 형태로 작성**한다.
  - **여는 태그의 내부**에도 주석을 작성할 수 있다.

    ```javascript
    return (
      <
        // 여는 태그에 주석을 작성할 수 있다.
      >
        {/* JSX 코드 내에서의 일반적인 주석 사용 방법 */}
      </>
    );
    ```
