# 챕터 1-4 : JSX

> 참고 : https://react.vlpt.us/basic/04-jsx.html

#### 📕 주로 배운 내용

- JSX 태그 기본 규칙

  - 태그는 항상 닫혀있어야 하며, 여는 태그(`<div>`)의 짝인 닫는 태그(`</div>`)가 없을 경우 오류가 발생한다.
  - 여는태그와 닫는태그 사이에 넣을 내용이 없다면, Self Closing(`<div />`)를 사용할 수 있다.
  - 두 개 이상의 태그는 항상 하나의 태그로 감싸져야만 한다. 반대로 태그 하나는 자신만으로 가능하다.

    ```
    // 태그 여러 개
    function App() {
      return (
        <div>
          <Component />
          <Component>내용</Component>
        </div>
      )
    }

    export default App;
    ```

    ```
    // 태그 한 개
    function App() {
      return <Component>내용</Component>
    }

    export default App;
    ```

  - Fragment라는 이름의 태그(`<></>` 혹은 `<Fragment></Fragment>`)를 편의상 쓸 수 있다.

    👉 테이블의 내용을 설정해주는 등 div 태그를 쓰기 난처한 상황의 경우, 이를 사용하면 유용하다.

    ```
    function App() {
      return (
        <>
          <Component />
          <Component>내용</Component>
        </>
      )
    }

    export default App;
    ```

  <br>

- 자바스크립트 변수 값 표시 및 스타일링

  - JSX 내부에 JS 변수 값을 보여줄 때는 중괄호로 감싼다.

    ```
    function Component() {
      const name = 'Uncyclocity';
      return <div>{name}</div>
    }

    export default Component;
    ```

  - 인라인 스타일은 객체 형태로 작성한다.

    ```
    function Component() {
      const style = {
        fontSize: 25, // 기본 단위는 px이다.
        color: "#47C83E",

        backgroundColor: "white",
        boxShadow: "0px 0px 30px #86E57F", // box-shadow와 같이 '-'로 구분되어 있는 이름들은 camelCase 형태로 네이밍 해주어야 한다.
        borderRadius: "30px",

        width: "230px",
        padding: "4rem", // px가 아닌 다른 단위를 사용하려면 문자열로 지정해야한다.
      }
      return <div style={style}>내용</div>
    }

    export default Component;
    ```

    ```
    function Component() {
      const color = "pink";

      /*
        객체를 내부에 넣어 주었다.
        객체 리터럴 문법에 따라, 객체에 변수만 넣더라도 변수의 이름이 스타일 속성의 이름일 경우 스타일링이 이루어진다.
      */
      return <div style={{color}}>내용</div>
    }

    export default Component;
    ```

  - 외부 CSS 파일을 가져올 수 있으며, CSS class를 설정 할 때는 HTML처럼 `class=`가 아닌, `className=`으로 설정 해주어야 한다.

    ```
    // 외부 CSS 파일 가져오기
    import './Component.css';

    function Component () {
      return <div className="button">GOT IT!</div>
    }

    export default Component;
    ```

  <br>

- JSX 안에서 주석 사용

  ```
  function Component () {
    return(
      <div
        // 여는 태그 안에서는 주석을 이렇게도 작성할 수 있다.
      >
        {/*JSX 코드 내에서의 일반적인 주석 사용 방법*/}
      </div>
    )
    export default Component;
  }
  ```
