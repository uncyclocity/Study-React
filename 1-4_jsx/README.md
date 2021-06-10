# 챕터 1-4 : JSX

> 참고 : https://react.vlpt.us/basic/04-jsx.html

#### 📕 주로 배운 내용

- JSX 태그 기본 규칙

  - 태그는 항상 닫혀있어야 하며, 여는 태그(`<div>`)의 짝인 닫는 태그(`</div>`)가 없을 경우 오류가 발생한다.
  - 컴포넌트를 가리키는 여는태그와 닫는태그 사이에 넣을 내용이 없다면, Self Closing(`<component />`)를 사용할 수 있다.
  - 두 개 이상의 태그는 항상 하나의 태그로 감싸져야만 한다. 반대로 태그 하나는 자신만으로 가능하다.

  ```{.javascript}
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

  ```{.javascript}
  // 태그 한 개
  function App() {
    return <Component>내용</Component>
  }

  export default App;
  ```

  - Fragment라는 이름의 아무 이름도 없는 태그를 편의상 쓸 수 있다.

  ```{.javascript}
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

  ```{.javascript}
  function Component() {
    const name = 'Uncyclocity';
    return <div>{name}</div>
  }

  export default Component;
  ```

  - 인라인 스타일은 객체 형태로 작성하여, 태그 style 속성에 넣어준다.

  ```{.javascript}
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

  - 외부 CSS 파일을 가져올 때는 import를 해주어야 하며, CSS class를 설정 할 때는 `class=`가 아닌 `className=`으로 설정 해주어야 한다.

  ```{.javascript}
  import './Component.css';

  function Component () {
    return <div className="button">GOT IT!</div>
  }

  export default Component;
  ```

  <br>

- JSX 안에서 주석 사용

```{.javascript}
function Component () {
  return(
    <div
      // 여는 태그 안에서는 주석을 이렇게도 작성할 수 있다.
    >
      {/*JSX 내에서 주석 사용 방법*/}
    </div>
  )

  export default Component;
}
```
