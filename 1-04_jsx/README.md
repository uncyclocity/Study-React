# 1-4. JSX

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
    👉 열림-닫힘을 일일이 써주기엔 좀 그렇다면, JSX의 **Self Closing(`<div />`) 문법**을 활용할 수 있다.
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
    // 태그 하나로 감싸지 않았으므로 에러
    return (
      <Component />
      <Component>내용</Component>
    );
    ```

  - div를 쓰기 곤란할 경우, **Fragment 태그(`<></>`)** 를 사용할 수 있다.

    ```javascript
    return (
      <>
        <Component />
        <Component>내용</Component>
      </>
    );
    ```

<br>

- ### JSX 내부에서 JS 사용

  - 중괄호로 감싸서 사용할 수 있다.

    ```javascript
    const name = "Uncyclocity";
    return <div>{name}</div>;
    ```

    ```javascript
    const name = "Uncyclocity";
    const introduce = (name) => alert(`제 이름은 ${name}입니다.`);
    return <button onClick={() => introduce(name)}>버튼</button>;
    ```

  - 인라인 스타일은 객체 형태로 작성한다.

    ```javascript
    function Component() {
      const style = {
        fontSize: 25, // 기본 단위는 px이다.
        color: "#47C83E",

        backgroundColor: "white",
        boxShadow: "0px 0px 30px #86E57F", // box-shadow와 같이 '-'로 구분되어 있는 이름들은 camelCase 형태로 네이밍 해주어야 한다.
        borderRadius: "30px",

        width: "230px",
        padding: "4rem", // px가 아닌 다른 단위를 사용하려면 문자열로 지정해야한다.
      };
      return <div style={style}>내용</div>;
    }

    export default Component;
    ```

    ```javascript
    function Component() {
      const color = "pink";

      /*
        객체를 내부에 넣어 주었다.
        객체 리터럴 문법에 따라, 객체에 변수만 넣더라도 변수의 이름이 스타일 속성의 이름일 경우 스타일링이 이루어진다.
      */
      return <div style={{ color }}>내용</div>;
    }

    export default Component;
    ```

  - 외부 CSS 파일을 가져올 수 있으며, CSS class를 설정 할 때는 HTML처럼 `class=`가 아닌, `className=`으로 설정 해주어야 한다.

    ```javascript
    // 외부 CSS 파일 가져오기
    import "./Component.css";

    function Component() {
      return <div className="button">GOT IT!</div>;
    }

    export default Component;
    ```

  <br>

- ### JSX 안에서 주석 사용하기

  ```javascript
  function Component() {
    return (
      <div
      // 여는 태그 안에서는 주석을 이렇게도 작성할 수 있다.
      >
        {/*JSX 코드 내에서의 일반적인 주석 사용 방법*/}
      </div>
    );
    export default Component;
  }
  ```
